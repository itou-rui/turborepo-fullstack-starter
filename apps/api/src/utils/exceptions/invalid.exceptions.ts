import { HttpStatus } from '@nestjs/common';
import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { type RESTErrorData } from '@workspace/types';
import { APIException } from './api.exception';

export class InvalidCredentialsException extends APIException {
  constructor(message: string = 'Invalid credentials', errors?: RESTErrorData) {
    super(RESTAPIErrorJSONCodes.InvalidCredentials, message, HttpStatus.UNAUTHORIZED, errors);
  }
}
