import { type Model, type HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type OmmitedBaseModelFields, type IGuild } from '@workspace/types';
import { BaseDocument, BaseDocumentSchema } from 'database/base.schema';

@Schema()
export class Guild extends BaseDocument implements Omit<IGuild, OmmitedBaseModelFields> {
  @Prop({ required: true, unique: true })
  uid!: string;

  @Prop({ required: true })
  name!: string;
}

export type GuildDocument = HydratedDocument<Guild>;

export type GuildModel = Model<GuildDocument>;

export const GuildSchema = SchemaFactory.createForClass(Guild);

GuildSchema.add(BaseDocumentSchema);
