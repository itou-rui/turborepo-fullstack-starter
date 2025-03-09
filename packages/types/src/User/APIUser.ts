import type { APIBase, OmitBaseModelFields } from '../Base';
import type { IUserModel, CreateUserDatails, UpdateUserDetails } from './IUser';

export type OmitAPIUserResponseFields = 'password';

/**
 * Type representing a user in the API, omitting certain fields.
 */
export type APIUser = Omit<IUserModel, OmitBaseModelFields | OmitAPIUserResponseFields> & APIBase;

/**
 * Type representing the JSON structure for a POST request to create a user.
 */
export type RESTPostAPIUserJSON = Omit<CreateUserDatails, 'email' | 'password'> & {
  email: string;
  password: string;
};

/**
 * Type representing the JSON structure for a PUT request to update a user.
 */
export type RESTPutAPIUserJSON = Omit<RESTPostAPIUserJSON, 'uid'>;

/**
 * Type representing a partial update to a user.
 * This type is used for PATCH requests to update user information.
 */
export type RESTPatchAPIUserJSON = UpdateUserDetails;
