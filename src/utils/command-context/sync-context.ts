import {SingleCommandResult} from '../perform-command';
import {CommandContext} from './command-context.types';

export function syncContext<T extends CommandContext>(
  context: T,
  commandResult: SingleCommandResult
): T {
  const stderr = context.stderr;
  const stdout = context.stdout;
  commandResult.stderr && stderr.push(commandResult.stderr);
  commandResult.stdout && stdout.push(commandResult.stdout);

  return {
    ...context,
    stderr,
    stdout,
    continue: context.continue && commandResult.success
  };
}
