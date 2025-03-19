import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { type RESTErrorData } from '@workspace/types';
import { ConflictAPIException } from './http-exceptions';

export class AlreadyUserExistsException extends ConflictAPIException {
  constructor(property: string, errors?: RESTErrorData) {
    super(RESTAPIErrorJSONCodes.AlreadyUser, `User with ${property} already exists.`, errors);
  }
}
