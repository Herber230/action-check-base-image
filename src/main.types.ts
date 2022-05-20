import {CommandContext} from './utils';

export interface ActionContext extends CommandContext {
  packageHash: string | undefined;
  imageExists: boolean;
}
