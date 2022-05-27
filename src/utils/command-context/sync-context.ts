import {CommandContext} from './command-context.types';

export function syncContext<T extends CommandContext>(
  context: T,
  newValues: Partial<T>
): T {
  const errors = [...context.errors, ...(newValues.errors || [])];

  return {
    ...context,
    ...newValues,
    errors
  };
}
