import { HttpException, HttpStatus } from '@nestjs/common';
import { type RESTErrorData } from '@workspace/types';
import { RESTAPIErrorJSONCodes } from '@workspace/constants';

export type APIExceptionDetails = {
  code: RESTAPIErrorJSONCodes;
  message: string;
  errors?: RESTErrorData;
};

/**
 * Custom exception class for API errors.
 */
export class APIException extends HttpException {
  /**
   * Creates an instance of APIException.
   * @param code - The error code representing the specific error.
   * @param message - A descriptive error message.
   * @param status - The HTTP status code.
   * @param errors - Optional additional error data.
   */
  constructor(code: RESTAPIErrorJSONCodes, message: string, status: HttpStatus, errors?: RESTErrorData) {
    super({ code, message, errors }, status);
  }
}
