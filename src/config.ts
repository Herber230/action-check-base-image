import {info, debug, warning, error} from '@actions/core';
import {getExecOutput} from '@actions/exec';
import {exec as childProcessExec} from 'child_process';
import {promisify} from 'util';

type Output = {
  info: (message: string) => void;
  debug: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
};

type ExecCommand = (
  command: string
) => Promise<{stdout: string; stderr: string}>;

// export const output: Output = {
//   info,
//   debug,
//   warning,
//   error
// };

// export const execCommand: ExecCommand = getExecOutput;

export const output: Output = {
  info: console.info,
  debug: console.debug,
  warning: console.warn,
  error: console.error
};

export const execCommand: ExecCommand = promisify(childProcessExec);
