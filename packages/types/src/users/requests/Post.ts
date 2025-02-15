import { type OmmitedBaseModelFields } from '../../common';
import type { APIUser } from '../models';

export interface RESTPostAPIUserJSONBody extends Omit<APIUser, OmmitedBaseModelFields> {}
