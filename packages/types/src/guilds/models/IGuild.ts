import type { BaseModel } from '../../common';

export interface IGuild extends BaseModel {
  /**
   * Unique identifier for the guild.
   */
  uid: string;

  /**
   * Name of the guild.
   */
  name: string;
}
