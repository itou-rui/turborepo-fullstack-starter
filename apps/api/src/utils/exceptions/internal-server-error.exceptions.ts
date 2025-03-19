import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { type RESTErrorData } from '@workspace/types';
import { InternalServerErrorAPIException } from './http-exceptions';

export class MissingUserPasswordException extends InternalServerErrorAPIException {
  constructor(errors?: RESTErrorData) {
    super(RESTAPIErrorJSONCodes.MissingUserPassword, `Password is not set for this account.`, errors);
  }
}
