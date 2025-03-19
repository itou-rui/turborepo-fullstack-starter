import { baseApi } from './baseApi';

const helloApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    hello: builder.query<{ message: string }, void>({
      query: () => ({
        url: '/',
      }),
    }),
  }),
});

export const { useHelloQuery } = helloApi;
