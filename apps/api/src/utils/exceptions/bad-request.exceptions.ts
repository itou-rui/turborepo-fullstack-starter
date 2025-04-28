import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { type RESTErrorData } from '@workspace/types';
import { BadRequestAPIException } from './http-exceptions';

export class GlobalValidationException extends BadRequestAPIException {
  constructor(errors?: RESTErrorData) {
    super(RESTAPIErrorJSONCodes.InvalidBody, 'Validation error.', errors);
  }
}

export class InvalidParameterException extends BadRequestAPIException {
  constructor(param: string, errors?: RESTErrorData) {
    super(RESTAPIErrorJSONCodes.InvalidParameter, `Invalid ${param}.`, errors);
  }
}

export class InvalidLocalAuthCredentialsException extends BadRequestAPIException {
  constructor(property: 'email' | 'password', errors?: RESTErrorData) {
    const errorCode = property === 'email' ? RESTAPIErrorJSONCodes.InvalidEmail : RESTAPIErrorJSONCodes.InvalidPassword;
    super(errorCode, `Invalid value for email or password.`, errors);
  }
}
