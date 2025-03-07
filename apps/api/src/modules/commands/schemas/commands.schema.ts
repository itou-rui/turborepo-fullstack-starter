import { type Model, type HydratedDocument, type Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type OmitBaseModelFields, type ICommand } from '@workspace/types';
import { BaseDocument, BaseDocumentSchema } from 'database/base.schema';
import { type Guild, GuildSchema } from '../../guilds/schemas';

@Schema()
export class Command extends BaseDocument implements Omit<ICommand, OmitBaseModelFields> {
  @Prop({ required: true, unique: true })
  uid!: string;

  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ type: GuildSchema, default: [] })
  guilds!: Guild[];

  @Prop({ required: true, default: true })
  active!: boolean;
}

export type CommandDocumentOverride = {
  guilds: Types.Subdocument<Types.ObjectId> & Guild[];
};

export type CommandDocument = HydratedDocument<Command, CommandDocumentOverride>;

export type CommandModel = Model<CommandDocument>;

export const CommandSchema = SchemaFactory.createForClass(Command);

CommandSchema.add(BaseDocumentSchema);
