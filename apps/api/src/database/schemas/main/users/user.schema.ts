import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../base.schema';
import { Profile, ProfileSchema } from './profile.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends BaseDocument {
  @Prop({ type: ProfileSchema, required: true, unique: true })
  profile!: Profile;

  @Prop({ unique: true })
  discordId!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
