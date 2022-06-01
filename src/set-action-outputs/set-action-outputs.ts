import {setFailed, setOutput} from '../config';
import {ActionContext} from '../main.types';
import {printMessage} from '../utils';

export function setActionOutputs(context: ActionContext): void {
  printMessage(`Entering [setActionOutputs]`, 'debug', {context});

  if (context.imageExists || context.continue) {
    context.packageHash && setOutput('HASH_RESULT', context.packageHash);
    context.completeImageName &&
      setOutput('COMPLETE_IMAGE_NAME', context.completeImageName);
    setOutput('SUCCESS', true);
    printMessage('Action completed successfully');
  } else {
    setOutput('SUCCESS', false);
    setFailed('There was an error on perform the action');
  }
}
