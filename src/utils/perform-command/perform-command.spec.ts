import {describe, expect, test} from '@jest/globals';

import {performSingleCommand} from './perform-command';

describe('tools:shared:perform-command', () => {
  test('Perform single command', async () => {
    expect.assertions(1);

    expect(
      await performSingleCommand({
        name: 'Some test command',
        executor: () => {
          return Promise.resolve({
            stdout: 'Some stdout'
          });
        }
      })
    ).toMatchObject({success: true});
  });

  test('Perform single command with retries', async () => {
    expect.assertions(1);

    expect(
      await performSingleCommand(
        {
          name: 'Some test command',
          executor: () => {
            return Promise.resolve({
              stderr: 'Some stderr'
            });
          }
        },
        {
          retries: 5,
          retryDelay: 1
        }
      )
    ).toMatchObject({success: false, attempt: 5});
  });
});
