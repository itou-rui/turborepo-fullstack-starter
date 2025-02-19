import { Document, Model, Types } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class BaseDocument extends Document {
  @Prop({ type: Types.ObjectId, auto: true })
  declare _id: Types.ObjectId;

  @Prop({ type: Number, default: 1, index: true })
  index!: number;

  @Prop({ type: String, default: () => new Date().toISOString() })
  createdAt!: string;

  @Prop({ type: String, default: () => new Date().toISOString() })
  updatedAt!: string;
}

export const BaseDocumentSchema = SchemaFactory.createForClass(BaseDocument);

BaseDocumentSchema.pre<BaseDocument>('save', async function (next) {
  if (this.isNew) {
    const Model = this.constructor as Model<BaseDocument>;
    const lastDoc = await Model.findOne({}, {}, { sort: { index: -1 } });
    this.index = lastDoc ? lastDoc.index + 1 : 1;
  }
  next();
});
