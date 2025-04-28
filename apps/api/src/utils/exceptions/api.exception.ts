import { DiscordErrorData } from 'discord.js';
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

/**
 * Exception class for handling Discord API errors.
 * Extends the base `APIException` class to provide detailed error information.
 */
export class DiscordAPIErrorException extends APIException {
  /**
   * Constructs a new `DiscordAPIErrorException`.
   *
   * @param code - The error code returned by the Discord API.
   * @param message - A descriptive error message.
   * @param status - The HTTP status code associated with the error.
   * @param errors - Optional detailed error data from the Discord API.
   */
  constructor(code: number, message: string, status: number, errors?: DiscordErrorData['errors']) {
    // If no detailed errors are provided, pass undefined to the base class.
    if (!errors) {
      super(code, message, status, undefined);
    }
    // If errors are an array, map them to a structured format.
    else if (Array.isArray(errors)) {
      super(code, message, status, {
        _errors: errors.map((error) => ({
          code: String(error.code),
          message: error.message,
        })),
      });
    }
    // If errors are not an array, cast them to RESTErrorData and pass to the base class.
    else {
      super(code, message, status, errors as RESTErrorData);
    }
  }
}
