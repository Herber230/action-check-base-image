import {getInput} from '@actions/core';

import {initContext, printMessage} from '../utils';
import {ActionContext} from '../main.types';

export function initAndValidateInputs(): Promise<ActionContext> {
  // const imageName = getInput('image-name') ?? 'herber230/test-image';
  // const dockerFile = getInput('docker-file') ?? 'testcicd/Dockerfile';
  // const hashSource = getInput('hash-source') ?? 'package.json';

  const imageName = 'herber230/test-image';
  const dockerFile = 'testcicd/Dockerfile';
  const hashSource = 'package.json';
  const temp = '';

  printMessage(`Image name: ${imageName}`, 'debug');
  printMessage(`Docker file: ${dockerFile}`, 'debug');
  printMessage(`Hash source: ${hashSource}`, 'debug');

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
      hashSource
    }
  });
}
