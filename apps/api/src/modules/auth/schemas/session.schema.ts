import { type Model, type HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type ISessionModel } from '@workspace/types';
import { ProviderType } from '@workspace/constants';
import { BaseDocument, BaseDocumentSchema } from 'database/base.schema';

@Schema()
export class Session extends BaseDocument implements ISessionModel {
  @Prop({ required: true })
  userId!: string;

  @Prop({ type: String, required: true, enum: ProviderType })
  provider!: ProviderType;

  @Prop({ required: true })
  accessToken!: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  tokenExpires?: string;
}

export type SessionDocument = HydratedDocument<Session>;
export type SessionModel = Model<SessionDocument>;

export const SessionSchema = SchemaFactory.createForClass(Session);

SessionSchema.add(BaseDocumentSchema);
