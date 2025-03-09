import type { Types } from 'mongoose';

/**
 * Interface representing the base model with common fields.
 */
export interface IBaseModel {
  /**
   * The unique identifier for the model.
   */
  _id: Types.ObjectId;

  /**
   * The index of the item in a collection.
   */
  index: number;

  /**
   * The date when the model was created.
   */
  createdAt: Date;

  /**
   * The date when the model was last updated.
   */
  updatedAt: Date;

  /**
   * The version number of the document.
   * This is used for internal versioning by the database.
   */
  _version: number;
}

/**
 * Type representing the fields to omit from the base model.
 */
export type OmitBaseModelFields = '_id' | 'index' | 'createdAt' | 'updatedAt' | '_version';
