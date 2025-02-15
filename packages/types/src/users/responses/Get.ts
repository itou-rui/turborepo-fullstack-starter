import type { APIUser, APIUserGuardFields } from '../models/APIUser';

export interface RESTGetAPIUserResult extends Omit<APIUser, APIUserGuardFields> {}
