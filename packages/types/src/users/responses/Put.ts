import type { APIUser, APIUserGuardFields } from '../models/APIUser';

export interface RESTPutAPIUserResult extends Omit<APIUser, APIUserGuardFields> {}
