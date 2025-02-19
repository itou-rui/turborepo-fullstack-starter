import type { OmmitedBaseModelFields } from '../../common';
import type { IUser } from '../models';

export interface RESTPostAPIUserJSONBody extends Omit<IUser, OmmitedBaseModelFields> {}
