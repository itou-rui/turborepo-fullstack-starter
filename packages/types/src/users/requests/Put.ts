import type { OmmitedBaseModelFields } from '../../common';
import type { IUser } from '../models';

export interface RESTPutAPIUserJSONBody extends Omit<IUser, OmmitedBaseModelFields> {}
