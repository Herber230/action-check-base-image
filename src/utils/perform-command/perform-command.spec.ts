import {performChainCommand, performSingleCommand} from './perform-command';

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

  test('Perform chain command', async () => {
    expect.assertions(1);

    expect(
      await performChainCommand({
        name: 'Some test command',
        executor: () => {
          return Promise.resolve({
            stdout: 'Some stdout'
          });
        }
      })({success: true})
    ).toMatchObject({success: true});
  });
});
