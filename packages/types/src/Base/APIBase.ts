import type { IBaseModel, OmitBaseModelFields } from './IBase';

/**
 * Interface representing the base model for API responses, with string types for certain fields.
 */
export interface APIBase extends Omit<IBaseModel, OmitBaseModelFields> {
  /**
   * The unique identifier for the model as a string.
   */
  _id: string;

  /**
   * The index of the item in a collection.
   */
  index: number;

  /**
   * The creation date as a string.
   */
  createdAt: string;

  /**
   * The last update date as a string.
   */
  updatedAt: string;

  /**
   * The version number of the entity.
   * This is used for version control and concurrency management.
   */
  _version: number;
}
