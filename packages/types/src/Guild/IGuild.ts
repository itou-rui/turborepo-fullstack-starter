import type { IBaseModel, OmitBaseModelFields } from '../Base';

export interface IGuildModel extends IBaseModel {
  /**
   * Unique identifier for the guild.
   */
  uid: string;

  /**
   * Name of the guild.
   */
  name: string;
}

/**
 * Details required to create a new guild.
 * This omits the base model fields from IGuildModel.
 */
export type CreateGuildDetails = Omit<IGuildModel, OmitBaseModelFields>;

/**
 * Details required to update an existing guild.
 * This makes all fields in CreateGuildDetails optional.
 */
export type UpdateGuildDetails = Partial<CreateGuildDetails>;
