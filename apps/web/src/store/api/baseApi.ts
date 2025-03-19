import { createApi, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RESTAPIErrorResult } from '@workspace/types';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  credentials: 'include',
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    // 2xx
    if (!result.error) {
      return result;
    }

    // 4xx, 5xx
    else {
      const error = result.error as FetchBaseQueryError;
      const errorData = error.data as RESTAPIErrorResult;
      return {
        meta: result.meta,
        error: errorData,
      };
    }
  },
  tagTypes: ['User'],
  endpoints: () => ({}),
});

export const isRESTAPIError = <T = string>(error: unknown): error is RESTAPIErrorResult<T> => {
  if (!error || typeof error !== 'object') return false;

  return (
    'code' in error &&
    typeof (error as RESTAPIErrorResult).code === 'number' &&
    (!('errors' in error) ||
      typeof (error as RESTAPIErrorResult).errors === 'object' ||
      typeof (error as RESTAPIErrorResult).errors === 'undefined')
  );
};
