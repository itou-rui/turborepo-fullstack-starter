import { HttpStatus } from '@nestjs/common';
import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { type RESTErrorData } from '@workspace/types';
import { APIException } from './api.exception';

export class ConflictException extends APIException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, errors?: RESTErrorData) {
    super(code, message, HttpStatus.CONFLICT, errors);
  }
}

export class UserAlreadyExistsException extends ConflictException {
  constructor(message: string, errors?: RESTErrorData) {
    super(RESTAPIErrorJSONCodes.AlreadyUser, message, errors);
  }
}
