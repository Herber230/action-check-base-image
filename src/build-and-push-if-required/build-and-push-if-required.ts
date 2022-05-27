import {ActionContext} from '../main.types';
import {performSingleCommand, syncContext} from '../utils';
import {execCommand} from '../config';

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
    executor: () => execCommand(`docker build . -t ${imageName} -f ${file}`),
    skipStderr: () => true
  })
    .then(result => {
      updatedContext = syncContext(updatedContext, result);
      return result;
    })
    .then(result => {
      if (!result.success) {
        return result;
      }

      return performSingleCommand({
        name: 'Push image',
        executor: () => execCommand(`docker push ${imageName}`)
      });
    })
    .then(result => syncContext(updatedContext, result));
}
