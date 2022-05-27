import {extractHash} from './extract-hash';
import {pullImage} from './pull-image';
import {buildAndPushIfRequired} from './build-and-push-if-required';
import {initAndValidateInputs} from './init-and-validate-inputs';
import {printMessage} from './utils';

function run(): void {
  initAndValidateInputs()
    .then(extractHash)
    .then(pullImage)
    .then(buildAndPushIfRequired)
    .then(result => {
      result.continue
        ? printMessage('Action completed successfully')
        : printMessage('Action incomplete', 'error');
    })
    .catch(exception => {
      printMessage(`Exception on action perform: ${exception}`, 'error');
    });
}

run();
