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
