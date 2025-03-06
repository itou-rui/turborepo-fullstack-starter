import type { ProviderType } from '@workspace/constants';
import type { APIBase, IBaseModel, OmitBaseModelFields } from './IBase';

/**
 * Interface representing a session model.
 */
export interface ISessionModel extends IBaseModel {
  /**
   * The ID of the user associated with the session.
   */
  userId: string;

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
}

/**
 * Type representing a session in the API, omitting certain fields.
 */
export type APISession = Omit<ISessionModel, OmitBaseModelFields> & APIBase;
