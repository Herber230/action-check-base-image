import {ActionContext} from '../main.types';
import {performSingleCommand, printMessage, syncContext} from '../utils';
import {execCommand} from '../config';

export function extractHash(
  context: ActionContext
): ActionContext | Promise<ActionContext> {
  printMessage(`Entering [extractHash]`, 'debug', {
    context
  });

  if (!context.continue) {
    return context;
  }

  return performSingleCommand({
    name: 'Extract hash',
    executor: () => execCommand(`cat ${context.params.hashSource} | md5sum`)
  }).then(result => {
    let packageHash: string | undefined = undefined;
    if (result.success && result.stdout) {
      packageHash = result.stdout.replace(/\s/g, '').replace(/\*/g, '');
      printMessage(`Package hash: ${packageHash}`, 'debug');
    }

    return syncContext(context, {packageHash, continue: result.success});
  });
}
