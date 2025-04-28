import type { RESTAPIErrorJSONCodes } from '@workspace/constants';
import type {
  RESTAPIErrorResult,
  RESTErrorData,
  RESTAPIValidationErrorFieldInfomation,
  RESTAPIErrorFieldInformation,
  APIErrorGroupWrapper,
} from '@workspace/types';

/**
 * Represents an API error with detailed information.
 * @template T - The type of the error data.
 */
export class ApiError<T = string> extends Error {
  /**
   * The HTTP status code of the error.
   */
  public readonly status: number;

  /**
   * The specific error code defined in the API.
   */
  public readonly code: RESTAPIErrorJSONCodes;

  /**
   * The timestamp when the error occurred.
   */
  public readonly timestamp: string;

  /**
   * The path of the API endpoint where the error occurred.
   */
  public readonly path: string;

  /**
   * Additional error details, if available.
   */
  public readonly errors?: RESTErrorData<T>;

  /**
   * Constructs an instance of ApiError.
   * @param errorDetails - The details of the API error.
   */
  constructor(errorDetails: RESTAPIErrorResult<T>) {
    super(errorDetails.message);
    this.name = 'ApiError';
    this.status = errorDetails.status || 405;
    this.code = errorDetails.code;
    this.timestamp = errorDetails.timestamp;
    this.path = errorDetails.path;
    this.errors = errorDetails.errors;
  }

  /**
   * Checks if the provided error is a group wrapper containing multiple errors.
   * @param error - The error data to check.
   * @returns True if the error is a group wrapper, otherwise false.
   */
  private isErrorGroupWrapper(error: RESTErrorData<T>): error is APIErrorGroupWrapper<T> {
    return '_errors' in error && Array.isArray((error as APIErrorGroupWrapper<T>)._errors);
  }

  /**
   * Checks if the provided error is a field information error.
   * @param error - The error data to check.
   * @returns True if the error is a field information error, otherwise false.
   */
  private isErrorFieldInformation(error: RESTErrorData<T>): error is RESTAPIErrorFieldInformation {
    return 'code' in error && 'message' in error && !('property' in error);
  }

  /**
   * Checks if the provided error is a validation error field.
   * @param error - The error data to check.
   * @returns True if the error is a validation error field, otherwise false.
   */
  private isValidationErrorField(error: RESTErrorData<T>): error is RESTAPIValidationErrorFieldInfomation<T> {
    return 'property' in error && 'value' in error;
  }

  /**
   * Determines if the error is a validation error.
   * @returns True if the error is a validation error, otherwise false.
   */
  public isValidationError(): boolean {
    if (!this.errors) return false;
    if (this.isErrorGroupWrapper(this.errors)) {
      return this.errors._errors.some((error) => this.isValidationErrorField(error));
    }
    return this.isValidationErrorField(this.errors);
  }

  /**
   * Retrieves all field information errors.
   * @returns An array of field information errors.
   */
  public getAllErrors(): RESTAPIErrorFieldInformation[] {
    if (!this.errors) return [];
    if (this.isErrorGroupWrapper(this.errors)) {
      return this.errors._errors.filter(this.isErrorFieldInformation);
    }
    if (this.isErrorFieldInformation(this.errors)) {
      return [this.errors];
    }
    return [];
  }

  /**
   * Retrieves all validation error fields.
   * @returns An array of validation error fields.
   */
  public getValidationErrors(): RESTAPIValidationErrorFieldInfomation<T>[] {
    if (!this.errors) return [];
    if (this.isErrorGroupWrapper(this.errors)) {
      return this.errors._errors.filter(this.isValidationErrorField);
    }
    if (this.isValidationErrorField(this.errors)) {
      return [this.errors];
    }
    return [];
  }

  /**
   * Retrieves all error messages.
   * @returns An array of error messages.
   */
  public getErrorMessages(): string[] {
    if (!this.errors) return [this.message];
    if (this.isErrorGroupWrapper(this.errors)) {
      return this.errors._errors.map((error) => {
        if (this.isErrorFieldInformation(error) || this.isValidationErrorField(error)) {
          return error.message;
        }
        return this.message;
      });
    }
    if (this.isErrorFieldInformation(this.errors) || this.isValidationErrorField(this.errors)) {
      return [this.errors.message];
    }
    return [this.message];
  }
}
