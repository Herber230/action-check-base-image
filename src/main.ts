import {buildAndPushIfRequired} from './build-and-push-if-required';
import {catchException} from './catch-exception';
import {extractHash} from './extract-hash';
import {initAndValidateInputs} from './init-and-validate-inputs';
import {pullImage} from './pull-image';
import {setActionOutputs} from './set-action-outputs';

function run(): void {
  initAndValidateInputs()
    .then(extractHash)
    .then(pullImage)
    .then(buildAndPushIfRequired)
    .then(setActionOutputs)
    .catch(catchException);
}

run();
