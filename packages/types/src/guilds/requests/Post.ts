import type { OmmitedBaseModelFields } from '../../common';
import type { APIGuild } from '../models';

export interface RESTPostAPIGuildJSONBody extends Omit<APIGuild, OmmitedBaseModelFields> {}
