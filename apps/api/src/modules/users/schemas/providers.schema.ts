import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type IUserProviders } from '@workspace/types';

@Schema({ _id: false })
export class LocalProvider {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
}

const LocalProviderSchema = SchemaFactory.createForClass(LocalProvider);

@Schema({ _id: false })
export class UserProviders implements IUserProviders {
  @Prop({ type: LocalProviderSchema })
  local?: LocalProvider;
}

export const UserProvidersSchema = SchemaFactory.createForClass(UserProviders);
