import {CommandContext} from './utils';

export interface Params {
  imageName: string;
  dockerFile: string;
  hashSource: string;
}

export interface ActionContext extends CommandContext {
  packageHash: string | undefined;
  imageExists: boolean;
  params: Params;
}
