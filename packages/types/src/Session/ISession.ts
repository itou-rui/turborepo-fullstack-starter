import type { Types } from 'mongoose';
import type { ProviderType } from '@workspace/constants';
import type { IBaseModel, OmitBaseModelFields } from '../Base';
import type { IUserModel } from '../User';

/**
 * Interface representing a session model.
 */
export interface ISessionModel<T = Record<string, any>> extends IBaseModel {
  /**
   * Unique identifier for the session.
   */
  uid: string;

  /**
   * The ID of the user associated with the session.
   */
  user: IUserModel;

  /**
   * The provider type for the session.
   */
  provider: ProviderType;

  /**
   * The access token for the session.
   */
  accessToken: string;

  /**
   * The refresh token for the session (optional).
   */
  refreshToken?: string;

  /**
   * The expiration time of the token (optional).
   */
  tokenExpires?: string;

  /**
   * Optional profile information associated with the session.
   */
  profile?: T;
}

/**
 * Fields of the session model document.
 */
export type ISessionModelDocumentFields = 'user';

/**
 * Details required to create a session, excluding base model fields.
 */
export type CreateSessionDetails<T> = Omit<ISessionModel<T>, OmitBaseModelFields | ISessionModelDocumentFields> & {
  user: Types.ObjectId;
};

/**
 * Type representing a partial update to session details.
 */
export type UpdateSessionDetails<T> = Partial<CreateSessionDetails<T>>;
