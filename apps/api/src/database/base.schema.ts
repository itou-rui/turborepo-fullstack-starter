import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { IBaseModel } from '@workspace/types';
import { autoIncrementPlugin, timestampsPlugin } from './plugins';

@Schema({ versionKey: '_version' })
export class BaseDocument extends Document implements IBaseModel {
  declare _id: Types.ObjectId;

  @Prop({ type: Number, default: 1, index: true })
  index!: number;

  @Prop({ type: Date, default: Date.now })
  createdAt!: Date;

  @Prop({ type: Date })
  updatedAt!: Date;

  declare _version: number;
}

export const BaseDocumentSchema = SchemaFactory.createForClass(BaseDocument);

BaseDocumentSchema.plugin(autoIncrementPlugin, { field: 'index', startAt: 1 });
BaseDocumentSchema.plugin(timestampsPlugin);
