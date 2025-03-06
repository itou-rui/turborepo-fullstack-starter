import type { Types } from 'mongoose';

export interface IBaseModel {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type OmitBaseModelFields = '_id' | 'createdAt' | 'updatedAt';

export interface APIBase extends Omit<IBaseModel, OmitBaseModelFields> {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
