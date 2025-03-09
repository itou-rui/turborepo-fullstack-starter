import type { APIBase, OmitBaseModelFields } from '../Base';
import type { APIGuild } from '../Guild';
import type { ICommandModelDocumentFields, ICommandModel } from './ICommand';

export type APICommand = Omit<ICommandModel, OmitBaseModelFields | ICommandModelDocumentFields> &
  APIBase & {
    guilds: APIGuild[];
  };
