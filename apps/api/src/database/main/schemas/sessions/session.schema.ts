import { type Model, type HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type APISession, type OmmitedBaseModelFields } from '@workspace/types';
import { ProviderType } from '@workspace/constants';
import { BaseDocument, BaseDocumentSchema } from '../../../common';

@Schema()
export class Session extends BaseDocument implements Omit<APISession, OmmitedBaseModelFields> {
  @Prop({ required: true })
  userId!: string;

  @Prop({ type: String, required: true, enum: ProviderType })
  provider!: ProviderType;

  @Prop({ required: true })
  providerId!: string;

  @Prop()
  accessToken?: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  tokenExpires?: string;

  @Prop({ type: Object })
  profile?: Record<string, any>;
}

export type SessionDocument = HydratedDocument<Session>;
export type SessionModel = Model<SessionDocument>;

export const SessionSchema = SchemaFactory.createForClass(Session);

SessionSchema.add(BaseDocumentSchema);

SessionSchema.index({ userId: 1, provider: 1 }, { unique: true });
SessionSchema.index({ provider: 1, providerId: 1 }, { unique: true });
