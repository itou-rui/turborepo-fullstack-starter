import type { RESTPostAPIUserJSON } from '../IUser';

export interface RESTPostAPIAuthLocalLoginJSON {
  email: string;
  password: string;
}

export interface RESTPostAPIAuthLocalRegisterJSON extends Omit<RESTPostAPIUserJSON, 'uuid'> {
  email: string;
  password: string;
}
