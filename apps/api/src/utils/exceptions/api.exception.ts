import { HttpException, HttpStatus } from '@nestjs/common';
import { RESTAPIErrorJSONCodes, type RESTErrorData } from '@workspace/types';

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
