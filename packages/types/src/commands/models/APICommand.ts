import type { ICommand, OmmitedICommandFields } from './ICommand';
import type { APIGuild } from '../../guilds';

export interface APICommand extends Omit<ICommand, OmmitedICommandFields> {
  guilds: APIGuild[];
}
