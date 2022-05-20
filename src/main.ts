import {initContext} from './utils';

import {ActionContext} from './main.types';

import {extractHash} from './extract-hash';
import {pullImage} from './pull-image';
import {buildAndPushIfRequired} from './build-and-push-if-required';

function run(): void {
  // try {
  //   const ms: string = core.getInput('milliseconds');
  //   core.debug(`Waiting ${ms} milliseconds ...`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

  //   core.debug(new Date().toTimeString());
  //   await wait(parseInt(ms, 10));
  //   core.debug(new Date().toTimeString());

  //   core.setOutput('time', new Date().toTimeString());
  // } catch (error) {
  //   if (error instanceof Error) core.setFailed(error.message);
  // }

  initContext<ActionContext>({imageExists: false})
    .then(extractHash)
    .then(pullImage)
    .then(buildAndPushIfRequired)
    .then(result => {
      console.log('Todo chingon');
    })
    .catch(error => {
      console.log('Error en ejecucion: ', error);
    });
}

run();
