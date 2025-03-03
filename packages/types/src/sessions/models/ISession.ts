import type { BaseModel } from '../../common';
import type { ProviderType } from '@workspace/constants';

export interface ISession extends BaseModel {
  userId: string;
  provider: ProviderType;
  accessToken?: string;
  refreshToken?: string;
  tokenExpires?: string;
  profile?: Record<string, any>;
}
