import type { RESTAPIErrorJSONCodes } from '@workspace/constants';

/**
 * Interface representing the base result of a REST API response.
 */
export interface RESTAPIBaseResult {
  /**
   * The HTTP status code of the response.
   */
  status: number;

  /**
   * The message associated with the response.
   */
  message: string;

  /**
   * The timestamp when the response was generated.
   */
  timestamp: string;

  /**
   * The path of the API endpoint that generated the response.
   */
  path: string;
}

/**
 * Interface representing a successful REST API response.
 * @template T - The type of the data in the response.
 */
export interface RESTAPISuccessResult<T> extends RESTAPIBaseResult {
  /**
   * The data returned in the response.
   */
  data: T;
}

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
 * Type representing the structure of error data in a REST API response.
 */
export type RESTErrorData = APIErrorGroupWrapper | RESTAPIErrorFieldInformation | { [k: string]: RESTErrorData };

/**
 * Interface representing a group of error data.
 */
export interface APIErrorGroupWrapper {
  /**
   * An array of error data.
   */
  _errors: RESTErrorData[];
}

/**
 * Interface representing an error result of a REST API response.
 */
export interface RESTAPIErrorResult extends RESTAPIBaseResult {
  /**
   * The error code associated with the response.
   */
  code: RESTAPIErrorJSONCodes;

  /**
   * Additional error data (optional).
   */
  errors?: RESTErrorData;
}
