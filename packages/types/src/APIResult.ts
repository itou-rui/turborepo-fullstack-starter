import type { RESTAPIErrorJSONCodes } from '@workspace/constants';

export interface RESTAPIBaseResult {
  status: number;
  message: string;
  timestamp: string;
  path: string;
}

export interface RESTAPISuccessResult<T> extends RESTAPIBaseResult {
  data: T;
}

export type OmitRESTAPIErrorResultFields = 'timestamp' | 'path';

export interface RESTAPIErrorFieldInformation {
  code: string;
  message: string;
}

export type RESTErrorData = APIErrorGroupWrapper | RESTAPIErrorFieldInformation | { [k: string]: RESTErrorData };

export interface APIErrorGroupWrapper {
  _errors: RESTErrorData[];
}

export interface RESTAPIErrorResult extends RESTAPIBaseResult {
  code: RESTAPIErrorJSONCodes;
  errors?: RESTErrorData;
}
