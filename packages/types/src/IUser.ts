import type { APIBase, IBaseModel, OmitBaseModelFields } from './IBase';

/**
 * Interface representing a user model.
 */
export interface IUserModel extends IBaseModel {
  /**
   * The unique identifier for the user.
   */
  uid: string;

  /**
   * The username of the user.
   */
  username: string;

  /**
   * The email of the user (optional).
   */
  email?: string;

  /**
   * The password of the user (optional).
   */
  password?: string;

  /**
   * The Discord ID of the user (optional).
   */
  discordId?: string;
}

/**
 * Type representing fields to omit from the API user response.
 */
export type OmitAPIUserResponseFields = 'password';

/**
 * Type representing a user in the API, omitting certain fields.
 */
export type APIUser = Omit<IUserModel, OmitBaseModelFields | OmitAPIUserResponseFields> & APIBase;

/**
 * Type representing the JSON structure for a POST request to create a user.
 */
export type RESTPostAPIUserJSON = Omit<APIUser, OmitBaseModelFields>;

/**
 * Type representing the JSON structure for a PUT request to update a user.
 */
export type RESTPutAPIUserJSON = Partial<Omit<APIUser, OmitBaseModelFields>>;

/**
 * Type representing the result of a GET request for a user.
 */
export type RESTGetAPIUserResult = APIUser;

/**
 * Type representing the result of a POST request to create a user.
 */
export type RESTPostAPIUserResult = APIUser;

/**
 * Type representing the result of a PUT request to update a user.
 */
export type RESTPutAPIUserResult = APIUser;

/**
 * Type representing the result of a DELETE request for a user.
 */
export type RESTDeleteAPIUserResult = { result: boolean };
