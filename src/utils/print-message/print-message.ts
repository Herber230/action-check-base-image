import {MessageType} from './print-message.types';
import {output} from '../../config';

function getReferenceString(referenceValues?: {
  [key: string]: unknown;
}): string {
  let referenceString = '';
  if (referenceValues) {
    const records = [];
    for (const key in referenceValues) {
      let value = '';
      try {
        value = JSON.stringify(referenceValues[key]);
      } catch (error) {
        value = '<Unable to parse>';
      }
      records.push(`${key} = ${value}`);
    }
    referenceString = `\n | Reference values: \n | - ${records.join('\n | - ')}`;
  }
  return referenceString;
}

export function printMessage(
  message: string,
  type: MessageType = 'info',
  referenceValues?: {[key: string]: unknown}
): void {
  output[type](`[${type}] - ${message}${getReferenceString(referenceValues)}`);
}
