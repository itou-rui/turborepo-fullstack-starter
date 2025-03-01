import type { BaseModel } from '../../common';

export interface IUser extends BaseModel {
  uid: string;
  firstName: string;
  secondName: string;
}
