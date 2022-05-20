export type SingleCommandResult = {
  success: boolean;
  attempt: number;
  stdout?: string;
  stderr?: string;
};

export type CommandChainContext = {
  success: boolean;
};

export type Command = {
  name: string;
  executor: () => Promise<{
    stdout?: string | undefined;
    stderr?: string | undefined;
  }>;
  skipStderr?: (stderr: string) => boolean;
};

export type CommandOptions = {
  retries?: number;
  retryDelay?: number;
};
