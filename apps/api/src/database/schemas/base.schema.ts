import { Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class BaseDocument extends Document {
  @Prop({ type: Types.ObjectId, auto: true })
  declare _id: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;
}
