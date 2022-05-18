import * as core from '@actions/core';
import {wait} from './wait';

import {exec} from 'child_process';

import {performSingleCommand} from './utils';
import {promisify} from 'util';

function run(): Promise<void> {
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

  const a = 1;

  const dockerPull = {
    name: 'Docker pull',
    executor: () => promisify(exec)('docker pull hello-world')
  };

  return performSingleCommand(dockerPull)
    .then(() => {
      console.log('Todo chingon');
    })
    .catch(error => {
      console.log('Error en ejecucion: ', error);
    });
}

run();
