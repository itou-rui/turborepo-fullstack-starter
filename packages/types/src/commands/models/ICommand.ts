import type { BaseModel } from '../../common';
import type { IGuild } from '../../guilds';

export interface ICommand extends BaseModel {
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

export type OmmitedICommandFields = 'guilds';
