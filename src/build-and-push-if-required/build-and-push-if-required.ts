import {execCommand} from '../config';
import {ActionContext} from '../main.types';
import {performSingleCommand, printMessage, syncContext} from '../utils';

export function buildAndPushIfRequired(
  context: ActionContext
): Promise<ActionContext> | ActionContext {
  printMessage(`Entering [buildAndPushIfRequired]`, 'debug', {context});

  if (!context.continue || context.imageExists) {
    return context;
  }

  const completeImageName = context.completeImageName;
  const dockerFile = context.params.dockerFile;
  const buildArgs = context.params.buildArgs
    ? ` ${context.params.buildArgs}`
    : '';

  let updatedContext = context;

  return performSingleCommand({
    name: 'Build image',
    executor: () =>
      execCommand(
        `docker build . -t ${completeImageName} -f ${dockerFile}${buildArgs}`
      ),
    skipStderr: () => true
  })
    .then(result => {
      updatedContext = syncContext(context, {continue: result.success});
      return result;
    })
    .then(result => {
      if (!result.success) {
        return result;
      }

      return performSingleCommand({
        name: 'Push image',
        executor: () => execCommand(`docker push ${completeImageName}`)
      });
    })
    .then(result => syncContext(updatedContext, {continue: result.success}));
}
