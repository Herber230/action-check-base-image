import {execCommand} from '../config';
import {ActionContext} from '../main.types';
import {performSingleCommand, printMessage, syncContext} from '../utils';

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
    executor: () => execCommand(`md5sum ${context.params.hashSource}`)
  }).then(result => {
    let packageHash: string | undefined = undefined;
    if (result.success && result.stdout) {
      packageHash = result.stdout.split(' ')[0].trim();
      printMessage(`Package hash: ${packageHash}`, 'debug');
    }

    return syncContext(context, {packageHash, continue: result.success});
  });
}
