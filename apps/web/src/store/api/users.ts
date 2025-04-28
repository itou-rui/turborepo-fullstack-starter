import type {
  RESTAPISuccessResult,
  RESTAPIErrorResult,
  APIUser,
  RESTPostAPIUserJSON,
  RESTPutAPIUserJSON,
  RESTPatchAPIUserJSON,
} from '@workspace/types';
import { baseApi } from './baseApi';

// Respose types
export type APIResponse<T> = RESTAPISuccessResult<T> | RESTAPIErrorResult;
export type GetUserResponse = APIResponse<APIUser>;
export type CreateUserResponse = APIResponse<APIUser>;
export type UpdateUserResponse = APIResponse<APIUser>;
export type PatchUserResponse = APIResponse<APIUser>;

// Request types
export type CreateUserRequest = RESTPostAPIUserJSON;
export type UpdateUserRequest = RESTPutAPIUserJSON;
export type PatchUserRequest = RESTPatchAPIUserJSON;

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<APIUser, string>({
      query: (uid) => `/internal/users/${uid}`,
      providesTags: (_result, _error, uid) => [{ type: 'User', id: uid }],
      transformResponse: (response: RESTAPISuccessResult<APIUser>) => response.data,
    }),

    createUser: builder.mutation<APIUser, CreateUserRequest>({
      query: (body) => ({
        url: '/internal/users',
        method: 'POST',
        body,
      }),
      transformResponse: (response: RESTAPISuccessResult<APIUser>) => response.data,
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<APIUser, { uid: string; body: UpdateUserRequest }>({
      query: ({ uid, body }) => ({
        url: `/internal/users/${uid}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: RESTAPISuccessResult<APIUser>) => response.data,
      invalidatesTags: (_result, _error, { uid }) => [{ type: 'User', id: uid }],
    }),

    patchUser: builder.mutation<APIUser, { uid: string; body: PatchUserRequest }>({
      query: ({ uid, body }) => ({
        url: `/internal/users/${uid}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: RESTAPISuccessResult<APIUser>) => response.data,
      invalidatesTags: (_result, _error, { uid }) => [{ type: 'User', id: uid }],
    }),
  }),
});

export const { useGetUserQuery, useCreateUserMutation, useUpdateUserMutation, usePatchUserMutation } = usersApi;
