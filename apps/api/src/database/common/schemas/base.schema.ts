import { Document, Model, Types } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class BaseDocument extends Document {
  @Prop({ type: Types.ObjectId, auto: true })
  declare _id: Types.ObjectId;

  @Prop({ type: String, default: () => new Date().toISOString(), transform: (val: Date) => val.toISOString() })
  createdAt!: string;

  @Prop({ type: Number, default: () => Date.now() })
  createdAtTimestamp!: number;

  @Prop({ type: String, default: () => new Date().toISOString(), transform: (val: Date) => val.toISOString() })
  updatedAt!: string;

  @Prop({ type: Number, default: () => Date.now() })
  updatedAtTimestamp!: number;

  @Prop({ type: Number, default: 0, index: true })
  index!: number;
}

export const BaseDocumentSchema = SchemaFactory.createForClass(BaseDocument);

BaseDocumentSchema.pre<BaseDocument>('save', async function (next) {
  if (this.isNew) {
    const Model = this.constructor as Model<BaseDocument>;
    const lastDoc = await Model.findOne({}, {}, { sort: { index: -1 } });
    this.index = lastDoc ? lastDoc.index + 1 : 0;
  }
  next();
});
