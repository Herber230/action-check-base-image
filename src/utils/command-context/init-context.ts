import {CommandContext} from './command-context.types';

export function initContext<T extends CommandContext>(
  initialContext?: Partial<T>
): Promise<T> {
  const baseContext = {
    continue: true,
    stdout: [],
    stderr: []
  };

  return Promise.resolve({
    ...baseContext,
    ...initialContext
  } as T);
}
