import type { IBaseModel } from '../Base';
import type { IGuildModel } from '../Guild';

export interface ICommandModel extends IBaseModel {
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
  guilds: IGuildModel[];

  /**
   * Whether the command is active or not.
   */
  active: boolean;
}

export type ICommandModelDocumentFields = 'guilds';
