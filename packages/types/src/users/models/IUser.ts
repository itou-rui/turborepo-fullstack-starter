import type { BaseModel } from '../../common';

export interface IUserProviders {
  local?: { email: string; password: string };
}

export interface IUser extends BaseModel {
  uuid: string;
  username: string;
  providers?: IUserProviders;
}
