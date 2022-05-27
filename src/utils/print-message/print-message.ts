import {MessageType} from './print-message.types';
import {output} from '../../config';

export function printMessage(
  message: string,
  type: MessageType = 'info'
): void {
  output[type](`[${type}] - ${message}`);
}
