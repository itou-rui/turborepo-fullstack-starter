import type { IUser } from './IUser';

export type APIUserGuardFields = 'password';

export interface APIUser extends Omit<IUser, APIUserGuardFields> {}
