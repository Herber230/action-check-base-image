import {exec} from 'child_process';
import {promisify} from 'util';

import {ActionContext} from '../main.types';
import {performSingleCommand, syncContext} from '../utils';

export function pullImage(
  context: ActionContext
): Promise<ActionContext> | ActionContext {
  if (!context.continue) {
    return context;
  }

  const imageName = `herber230/test-image:${context.packageHash}`;

  return performSingleCommand({
    name: 'Pull image',
    executor: () => promisify(exec)(`docker pull ${imageName}`)
  }).then(result => {
    const imageExists = result.success;

    return {
      ...syncContext(context, result),
      imageExists,
      continue: true
    };
  });
}
