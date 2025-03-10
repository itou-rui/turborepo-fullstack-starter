import { type Model, type HydratedDocument, Types } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type ISessionModel } from '@workspace/types';
import { ProviderType } from '@workspace/constants';
import { BaseDocument, BaseDocumentSchema } from 'database/base.schema';
import { User } from '../../users';

@Schema()
export class Session extends BaseDocument implements ISessionModel {
  @Prop({ required: true, unique: true })
  uid!: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user!: User;

  @Prop({ type: String, required: true, enum: ProviderType })
  provider!: ProviderType;

  @Prop({ required: true })
  accessToken!: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  tokenExpires?: string;

  @Prop(
    raw({
      id: { type: String },
      username: { type: String },
      email: { type: String },
    }),
  )
  profile?: Record<string, any>;
}

export type SessionDocument = HydratedDocument<Session>;
export type SessionModel = Model<SessionDocument>;

export const SessionSchema = SchemaFactory.createForClass(Session);

SessionSchema.add(BaseDocumentSchema);
