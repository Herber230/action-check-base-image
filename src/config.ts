import {
  debug,
  error,
  getInput as actionsGetInput,
  info,
  warning
} from '@actions/core';
import {getExecOutput} from '@actions/exec';
// import {exec as childProcessExec} from 'child_process';
// import {promisify} from 'util';

type Output = {
  info: (message: string) => void;
  debug: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
};

type ExecCommand = (
  command: string
) => Promise<{stdout: string; stderr: string}>;

type GetInput = (name: string) => string;

// This exports can be swap to perform tests locally. The important thing is to meet the type definition.

//#region Normal Exports
export const output: Output = {
  info,
  debug,
  warning,
  error
};

export const execCommand: ExecCommand = getExecOutput;

export const getInput: GetInput = actionsGetInput;
//#endregion Normal Exports

//#region Local Tests Exports
// export const output: Output = {
//   info: console.info,
//   debug: console.debug,
//   warning: console.warn,
//   error: console.error
// };

// export const execCommand: ExecCommand = promisify(childProcessExec);

// export const getInput: GetInput = (name: string) => {
//   switch (name) {
//     case 'image-name':
//       return 'herber230/test-image';
//     case 'docker-file':
//       return 'testcicd/Dockerfile';
//     case 'hash-source':
//       return 'package.json';
//     default:
//       return '';
//   }
// };
//#endregion Local Tests Exports
