import {exec} from 'child_process';
import {promisify} from 'util';

import {ActionContext} from '../main.types';
import {performSingleCommand, syncContext} from '../utils';

export function buildAndPushIfRequired(
  context: ActionContext
): Promise<ActionContext> | ActionContext {
  if (!context.continue || context.imageExists) {
    return context;
  }

  const imageName = `herber230/test-image:${context.packageHash}`;
  const file = 'testcicd/Dockerfile';
  let updatedContext = context;

  return performSingleCommand({
    name: 'Build image',
    executor: () =>
      promisify(exec)(`docker build . -t ${imageName} -f ${file}`),
    skipStderr: () => true
  })
    .then(result => {
      updatedContext = syncContext(updatedContext, result);
      return result;
    })
    .then(result => {
      console.log('[>>>] result: ', result);
      if (!result.success) {
        return result;
      }

      return performSingleCommand({
        name: 'Push image',
        executor: () => promisify(exec)(`docker push ${imageName}`)
      });
    })
    .then(result => syncContext(updatedContext, result));
}
