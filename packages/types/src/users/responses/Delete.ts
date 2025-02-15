import type { APIUser, APIUserGuardFields } from '../models';

export interface RESTDeleteAPIUserResult extends Omit<APIUser, APIUserGuardFields> {}
