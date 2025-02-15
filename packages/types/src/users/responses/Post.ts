import type { APIUser, APIUserGuardFields } from '../models';

export interface RESTPostAPIUserResult extends Omit<APIUser, APIUserGuardFields> {}
