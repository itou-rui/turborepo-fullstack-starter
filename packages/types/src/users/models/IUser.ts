import type { BaseModel } from '../../common';

export interface IUser extends BaseModel {
  email: string;
  password: string;
  discordId?: string;
  twitterId?: string;
}
