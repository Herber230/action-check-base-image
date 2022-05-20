import {MessageType} from './print-message.types';

export function printMessage(
  message: string,
  type: MessageType = 'info'
): void {
  console.log(`[${type}] - ${message}`);
}
