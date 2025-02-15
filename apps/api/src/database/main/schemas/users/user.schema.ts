import { type Model, type HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type APIUser, type OmmitedBaseModelFields } from '@workspace/types';
import { BaseDocument, BaseDocumentSchema } from '../../../common';

export type UserDocument = HydratedDocument<User>;
export type UserModel = Model<UserDocument>;

@Schema()
export class User extends BaseDocument implements Omit<APIUser, OmmitedBaseModelFields> {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.add(BaseDocumentSchema);
