import type { BaseModel } from '../../common';

export interface APIUser extends BaseModel {
  email: string;
  password: string;
}

export type APIUserGuardFields = 'password';
