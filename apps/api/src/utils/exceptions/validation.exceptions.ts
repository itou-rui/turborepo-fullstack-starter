import { HttpStatus } from '@nestjs/common';
import { RESTAPIErrorJSONCodes } from '@workspace/constants';
import { type RESTErrorData } from '@workspace/types';
import { APIException } from './api.exception';

export class ValidationException extends APIException {
  constructor(messageOrErrors: string | RESTErrorData, errors?: RESTErrorData) {
    if (typeof messageOrErrors === 'string') {
      super(RESTAPIErrorJSONCodes.BadRequest, messageOrErrors, HttpStatus.BAD_REQUEST, errors);
    } else {
      super(RESTAPIErrorJSONCodes.BadRequest, 'Validation error.', HttpStatus.BAD_REQUEST, messageOrErrors);
    }
  }
}

export class GlobalValidationException extends ValidationException {
  constructor(messageOrErrors: string | RESTErrorData, errors?: RESTErrorData) {
    super(messageOrErrors, errors);
  }
}
