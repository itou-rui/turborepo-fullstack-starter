import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type IUserProviders } from '@workspace/types';
import { LocalProvider, LocalProviderSchema } from './local.schema';

@Schema({ _id: false })
export class UserProviders implements IUserProviders {
  @Prop({ type: LocalProviderSchema })
  local?: LocalProvider;
}

export const UserProvidersSchema = SchemaFactory.createForClass(UserProviders);
