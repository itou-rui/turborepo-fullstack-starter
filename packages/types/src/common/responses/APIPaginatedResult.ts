import type { RESTAPIResult } from './APIResult';

export interface RESTAPIPaginatedResult<T> extends RESTAPIResult<T[]> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
