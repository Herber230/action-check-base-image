import {ActionContext} from '../main.types';
import {performSingleCommand, printMessage, syncContext} from '../utils';
import {execCommand} from '../config';

export function pullImage(
  context: ActionContext
): Promise<ActionContext> | ActionContext {
  printMessage(`Entering [pullImage]`, 'debug', {context});

  if (!context.continue) {
    return context;
  }

  const completeImageName = `${context.params.imageName}:${context.packageHash}`;

  return performSingleCommand({
    name: 'Pull image',
    executor: () => execCommand(`docker pull ${completeImageName}`)
  }).then(result => {
    const imageExists = result.success;

    return syncContext(context, {imageExists, continue: true});
  });
}
