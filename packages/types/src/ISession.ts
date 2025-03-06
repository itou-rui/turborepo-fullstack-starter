import type { ProviderType } from '@workspace/constants';
import type { APIBase, IBaseModel, OmitBaseModelFields } from './IBase';

export interface ISessionModel extends IBaseModel {
  userId: string;
  provider: ProviderType;
  accessToken: string;
  refreshToken?: string;
  tokenExpires?: string;
}

export type APISession = Omit<ISessionModel, OmitBaseModelFields> & APIBase;
