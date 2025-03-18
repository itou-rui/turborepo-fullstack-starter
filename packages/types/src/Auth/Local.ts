import type { ProviderType } from '@workspace/constants';
import type { RESTPostAPIUserJSON } from '../User';

/**
 * Interface representing the JSON structure for a local login request.
 */
export interface RESTPostAPIAuthLocalLoginJSON {
  /**
   * The email of the user.
   */
  email: string;

  /**
   * The password of the user.
   */
  password: string;
}

/**
 * Interface representing the JSON structure for a local registration request.
 * Extends the user JSON structure, omitting the 'uuid' field.
 */
export interface RESTPostAPIAuthLocalRegisterJSON extends Omit<RESTPostAPIUserJSON, 'uid'> {
  /**
   * The email of the user.
   */
  email: string;

  /**
   * The password of the user.
   */
  password: string;
}

export interface LocalAuthProfile {
  uid: string;
  username: string;
  email: string;
  provider: ProviderType;
}
