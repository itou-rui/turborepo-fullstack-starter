import type { RESTAPIErrorJSONCodes } from '@workspace/constants';
import type { RESTAPIBaseResult } from './APIBase';

/**
 * Type representing fields to omit from the REST API error result.
 */
export type OmitRESTAPIErrorResultFields = 'timestamp' | 'path';

/**
 * Interface representing detailed information about an error field.
 */
export interface RESTAPIErrorFieldInformation {
  /**
   * The error code.
   */
  code: string;

  /**
   * The error message.
   */
  message: string;
}

/**
 * Interface representing detailed information about a validation error field in a REST API.
 * @template T - The type of the value associated with the error field.
 */
export interface RESTAPIValidationErrorFieldInfomation<T> extends RESTAPIErrorFieldInformation {
  /** The name of the property that caused the validation error. */
  property: string;

  /** The value of the property that caused the validation error. */
  value: T;

  /** The error message associated with the validation error. */
  message: string;
}

/**
 * Type representing the structure of error data in a REST API response.
 */
export type RESTErrorData<T = any> =
  | APIErrorGroupWrapper
  | RESTAPIErrorFieldInformation
  | RESTAPIValidationErrorFieldInfomation<T>
  | { [k: string]: RESTErrorData<T> };

/**
 * Interface representing a group of error data.
 */
export interface APIErrorGroupWrapper<T = string> {
  /**
   * An array of error data.
   */
  _errors: RESTErrorData<T>[];
}

/**
 * Interface representing an error result of a REST API response.
 */
export interface RESTAPIErrorResult<T = string> extends RESTAPIBaseResult {
  /**
   * The error code associated with the response.
   */
  code: RESTAPIErrorJSONCodes;

  /**
   * Additional error data (optional).
   */
  errors?: RESTErrorData<T>;
}
