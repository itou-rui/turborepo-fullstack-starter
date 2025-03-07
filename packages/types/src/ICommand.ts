import type { APIBase, IBaseModel, OmitBaseModelFields } from './IBase';
import { APIGuild, type IGuild } from './IGuild';

export interface ICommand extends IBaseModel {
  /**
   * Unique identifier for the guild.
   */
  uid: string;

  /**
   * Name of the guild.
   */
  name: string;

  /**
   * description of the command.
   */
  description?: string;

  /**
   * List of guilds that the command is available in.
   */
  guilds: IGuild[];

  /**
   * Whether the command is active or not.
   */
  active: boolean;
}

export type APICommand = Omit<IGuild, OmitBaseModelFields | 'guilds'> &
  APIBase & {
    guilds: APIGuild[];
  };
