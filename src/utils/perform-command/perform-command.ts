import {promisify} from 'util';

import {printMessage} from '../print-message';

import {
  Command,
  SingleCommandResult,
  CommandChainContext,
  CommandOptions
} from './perform-command.types';

function singleCommandAttempt(
  command: Command,
  attempt: number
): Promise<SingleCommandResult> {
  printMessage(`Executing command: ${command.name} ...`);

  return command
    .executor()
    .then(result => {
      const success =
        !result.stderr ||
        !!(command.skipStderr && command.skipStderr(result.stderr));

      result.stdout && printMessage(`stdout: ${result.stdout}`, 'debug');
      result.stderr &&
        printMessage(`stderr: ${result.stderr}`, !success ? 'error' : 'debug');

      return {success, attempt, stderr: result.stderr, stdout: result.stdout};
    })
    .catch(error => {
      printMessage(
        `Exception on perform command [${command.name}]: ${error}`,
        'error'
      );
      return {success: false, attempt};
    });
}

export function performSingleCommand(
  command: Command,
  options?: CommandOptions
): Promise<SingleCommandResult> {
  const {retries = 2, retryDelay = 5000} = options || {};

  const perform = (attempt: number): Promise<SingleCommandResult> =>
    singleCommandAttempt(command, attempt).then(result => {
      if (result.success || result.attempt >= retries) {
        return result;
      } else {
        printMessage(
          `Retrying [${command.name}] command in ${retryDelay}ms...`
        );
        return promisify(setTimeout)(retryDelay).then(() =>
          perform(result.attempt + 1)
        );
      }
    });

  return perform(0);
}

export function performChainCommand(
  command: Command,
  options?: CommandOptions
): (
  context: CommandChainContext
) => CommandChainContext | Promise<CommandChainContext> {
  return (context: CommandChainContext) => {
    if (context.success) {
      return performSingleCommand(command, options).then(result => {
        // Attach more data to the context if required
        return {...context, success: result.success};
      });
    } else {
      return context;
    }
  };
}
