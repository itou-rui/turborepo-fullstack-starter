export interface RESTAPIResult<T> {
  data: T;
  status: number;
  message: string;
}
