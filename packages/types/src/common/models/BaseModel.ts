export interface BaseModel {
  _id: string;
  createdAt: string;
  createdAtTimestamp: number;
  updatedAt: string;
  updatedAtTimestamp: number;
}

export type OmmitedBaseModelFields = '_id' | 'createdAt' | 'updatedAt' | 'createdAtTimestamp' | 'updatedAtTimestamp';
