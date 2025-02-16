import { HttpException, HttpStatus } from '@nestjs/common';
import { RESTAPIErrorJSONCodes, type RESTErrorData } from '@workspace/types';

export class APIException extends HttpException {
  constructor(code: RESTAPIErrorJSONCodes, message: string, status: HttpStatus, errors?: RESTErrorData) {
    super({ code, message, errors }, status);
  }
}
