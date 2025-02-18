export interface BaseModel {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type OmmitedBaseModelFields = '_id' | 'createdAt' | 'updatedAt';
