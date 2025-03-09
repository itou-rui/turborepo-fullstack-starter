import type { IBaseModel, OmitBaseModelFields } from '../Base';

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
}

/**
 * Type for creating user details, omitting base model fields.
 */
export type CreateUserDatails = Omit<IUserModel, OmitBaseModelFields>;

/**
 * Type representing a partial update to user details.
 */
export type UpdateUserDetails = Partial<CreateUserDatails>;
