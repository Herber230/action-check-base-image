export type SingleCommandResult = {
  success: boolean;
  attempt: number;
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
};

export type CommandOptions = {
  retries?: number;
  retryDelay?: number;
};
