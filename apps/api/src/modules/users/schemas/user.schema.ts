import { type Model, type HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type IUser, type OmmitedBaseModelFields } from '@workspace/types';
import { BaseDocument, BaseDocumentSchema } from 'database/base.schema';
import { type UserProviders, UserProvidersSchema } from './providers.schema';

@Schema()
export class User extends BaseDocument implements Omit<IUser, OmmitedBaseModelFields> {
  @Prop({ required: true, unique: true })
  uuid!: string;

  @Prop({ required: true })
  username!: string;

  @Prop({ type: UserProvidersSchema })
  providers?: UserProviders;
}

export type UserDocumentOverride = {
  providers?: Types.Subdocument<Types.ObjectId> & UserProviders;
};

export type UserDocument = HydratedDocument<User, UserDocumentOverride>;
export type UserModel = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.add(BaseDocumentSchema);
