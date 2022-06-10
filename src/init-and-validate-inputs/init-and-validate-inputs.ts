import {getInput} from '../config';
import {ActionContext} from '../main.types';
import {initContext, printMessage} from '../utils';

export function initAndValidateInputs(): Promise<ActionContext> {
  const imageName = getInput('image-name');
  const dockerFile = getInput('docker-file');
  const hashSource = getInput('hash-source');
  const buildArgs = getInput('build-args');

  printMessage(`Image name: ${imageName}`, 'debug');
  printMessage(`Docker file: ${dockerFile}`, 'debug');
  printMessage(`Hash source: ${hashSource}`, 'debug');
  printMessage(`Build args: ${buildArgs}`, 'debug');

  const validParams = [
    !imageName && printMessage('image-name is required', 'error'),
    !dockerFile && printMessage('docker-file is required', 'error'),
    !hashSource && printMessage('hash-source is required', 'error')
  ].every(p => p != null);

  printMessage(`Valid params: ${validParams}`, 'debug');

  return initContext<ActionContext>({
    imageExists: false,
    continue: validParams,
    params: {
      imageName,
      dockerFile,
      hashSource,
      buildArgs
    }
  });
}
