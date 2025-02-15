import { type OmmitedBaseModelFields } from '../../common';
import type { APIUser } from '../models';

export interface RESTPutAPIUserJSONBody extends Omit<APIUser, OmmitedBaseModelFields> {}
