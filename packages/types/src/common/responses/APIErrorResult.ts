import { RESTAPIErrorJSONCodes } from '../errors';
import type { RESTAPIResult } from './APIResult';

export type OmmitedRESTAPIErrorResultFields = 'timestamp' | 'path';

export interface RESTAPIErrorFieldInformation {
  code: string;
  message: string;
}

export type RESTErrorData = RESTAPIErrorGroupWrapper | RESTAPIErrorFieldInformation | { [k: string]: RESTErrorData };

export interface RESTAPIErrorGroupWrapper {
  _errors: RESTErrorData[];
}

export interface RESTAPIErrorResult extends RESTAPIResult {
  code: RESTAPIErrorJSONCodes;
  errors?: RESTErrorData;
}
