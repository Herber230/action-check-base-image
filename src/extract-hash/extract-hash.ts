import {ActionContext} from '../main.types';
import {performSingleCommand, syncContext} from '../utils';
import {execCommand} from '../config';

export function extractHash(context: ActionContext): Promise<ActionContext> {
  return performSingleCommand({
    name: 'Extract hash',
    executor: () => execCommand('cat package.json | md5sum')
  }).then(result => {
    let packageHash: string | undefined = undefined;
    if (result.success && result.stdout) {
      packageHash = result.stdout.replace(/\s/g, '').replace(/\*/g, '');
    }

    return {
      ...syncContext(context, result),
      packageHash
    };
  });
}
