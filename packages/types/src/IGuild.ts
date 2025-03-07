import type { APIBase, IBaseModel, OmitBaseModelFields } from './IBase';

export interface IGuild extends IBaseModel {
  /**
   * Unique identifier for the guild.
   */
  uid: string;

  /**
   * Name of the guild.
   */
  name: string;
}

export type APIGuild = Omit<IGuild, OmitBaseModelFields> & APIBase;

export type RESTPostAPIGuildJSON = Omit<APIGuild, OmitBaseModelFields>;
