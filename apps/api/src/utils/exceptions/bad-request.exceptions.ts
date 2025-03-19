import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { type RESTErrorData } from '@workspace/types';
import { BadRequestAPIException } from './http-exceptions';

export class GlobalValidationException extends BadRequestAPIException {
  constructor(errors?: RESTErrorData) {
    super(RESTAPIErrorJSONCodes.BadRequest, 'Validation error.', errors);
  }
}

export class InvalidLocalAuthCredentialsException extends BadRequestAPIException {
  constructor(errors?: RESTErrorData) {
    super(RESTAPIErrorJSONCodes.InvalidCredentials, `Invalid value for email or password.`, errors);
  }
}
