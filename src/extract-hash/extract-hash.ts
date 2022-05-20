import {exec} from 'child_process';
import {promisify} from 'util';

import {ActionContext} from '../main.types';
import {performSingleCommand, syncContext} from '../utils';

export function extractHash(context: ActionContext): Promise<ActionContext> {
  return performSingleCommand({
    name: 'Extract hash',
    executor: () => promisify(exec)('cat package.json | md5sum')
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
