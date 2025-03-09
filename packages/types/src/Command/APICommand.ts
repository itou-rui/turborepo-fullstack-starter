import type { APIBase, OmitBaseModelFields } from '../Base';
import type { APIGuild } from '../Guild';
import { type ICommandModel } from './ICommand';

export type APICommand = Omit<ICommandModel, OmitBaseModelFields> &
  APIBase & {
    guilds: APIGuild[];
  };
