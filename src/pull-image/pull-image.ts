import {ActionContext} from '../main.types';
import {performSingleCommand, syncContext} from '../utils';
import {execCommand} from '../config';

export function pullImage(
  context: ActionContext
): Promise<ActionContext> | ActionContext {
  if (!context.continue) {
    return context;
  }

  const imageName = `herber230/test-image:${context.packageHash}`;

  return performSingleCommand({
    name: 'Pull image',
    executor: () => execCommand(`docker pull ${imageName}`)
  }).then(result => {
    const imageExists = result.success;

    return {
      ...syncContext(context, result),
      imageExists,
      continue: true
    };
  });
}
