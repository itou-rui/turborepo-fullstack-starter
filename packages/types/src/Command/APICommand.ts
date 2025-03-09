import type { APIBase, OmitBaseModelFields } from '../Base';
import type { APIGuild, IGuildModel } from '../Guild';

export type APICommand = Omit<IGuildModel, OmitBaseModelFields> &
  APIBase & {
    guilds: APIGuild[];
  };
