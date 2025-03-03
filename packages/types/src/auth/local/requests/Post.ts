import type { RESTPostAPIUserJSONBody } from '../../../users';

export interface RESTPostAPIAuthLocalLoginJSONBody {
  email: string;
  password: string;
}

export interface RESTPostAPIAuthLocalRegisterJSONBody extends Omit<RESTPostAPIUserJSONBody, 'uuid' | 'providers'> {
  email: string;
  password: string;
}
