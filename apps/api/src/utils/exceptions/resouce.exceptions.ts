import { HttpStatus } from '@nestjs/common';
import { type RESTErrorData } from '@workspace/types';
import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { APIException } from './api.exception';

export class ResourceNotFoundException extends APIException {
  constructor(code: number, message: string = 'Resource not found', errors?: RESTErrorData) {
    super(code, message, HttpStatus.NOT_FOUND, errors);
  }
}

export class UserNotFoundException extends APIException {
  constructor(message: string = 'Resource not found', errors?: RESTErrorData) {
    super(RESTAPIErrorJSONCodes.UnknownAccount, message, HttpStatus.NOT_FOUND, errors);
  }
}

export class ResourceAlreadyExistsException extends APIException {
  constructor(code: number, message: string = 'Resource already exists', errors?: RESTErrorData) {
    super(code, message, HttpStatus.CONFLICT, errors);
  }
}
