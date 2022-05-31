import {setFailed, setOutput} from '../config';
import {printMessage} from '../utils';

export function catchException(exception: unknown): void {
  setOutput('SUCCESS', false);

  if (exception instanceof Error) {
    printMessage(`Exception on action perform: ${exception.message}`, 'error');
    setFailed(exception.message);
  } else {
    printMessage(`Exception on action perform`, 'error');
    setFailed('Unknown exception');
  }
}
