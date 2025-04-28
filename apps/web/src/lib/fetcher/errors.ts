import type { ErrorMessages } from '@workspace/constants';

export type FetchErrorCode = 'MISSING_BASE_URL' | 'BASE_URL_NOT_STRING' | 'INVALID_URL' | 'FETCH_ERROR';

const MISSING_BASE_URL = {
  log: 'The environment variable `BASE_URL` is not set. Please check the implementation.',
  notice: 'A problem has occurred.',
} as const;

const BASE_URL_NOT_STRING = {
  log: 'The environment variable `BASE_URL` is not a string. Please check the implementation.',
  notice: 'A problem has occurred.',
} as const;

const INVALID_URL = {
  log: 'The environment variable `BASE_URL` is invalid as a URL. Please check the implementation.',
  notice: 'A problem has occurred.',
} as const;

const FETCH_ERROR = {
  log: 'An exception occurred during the HTTP request. Please check the implementation.',
  notice: 'A problem has occurred.',
} as const;

export const FETCH_ERROR_MESSAGES: Record<FetchErrorCode, ErrorMessages> = {
  MISSING_BASE_URL,
  BASE_URL_NOT_STRING,
  INVALID_URL,
  FETCH_ERROR,
} as const;

export type FetchErrorDetails = {
  baseUrl: string;
  fullPath?: string;
  origin?: string;
};

export class FetcherError extends Error {
  public readonly code: FetchErrorCode;
  public readonly details: FetchErrorDetails;

  constructor(code: FetchErrorCode, message: string, details: FetchErrorDetails) {
    super(message);
    this.name = 'FetcherError';
    this.code = code;
    this.details = details;
  }
}
