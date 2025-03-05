import { type Model, type HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type OmmitedBaseModelFields, type ICommand, OmmitedICommandFields } from '@workspace/types';
import { BaseDocument, BaseDocumentSchema } from 'database/base.schema';
import { type Guild, GuildSchema } from '../../guilds/schemas';

interface ICommandDocument extends Omit<ICommand, OmmitedBaseModelFields | OmmitedICommandFields> {
  guilds: Guild[];
}

@Schema()
export class Command extends BaseDocument implements ICommandDocument {
  @Prop({ required: true, unique: true })
  uid!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: GuildSchema, required: false, default: [] })
  guilds!: Guild[];

  @Prop({ required: true, default: true })
  active!: boolean;
}

export type CommandDocument = HydratedDocument<Command>;

export type CommandModel = Model<CommandDocument>;

export const CommandSchema = SchemaFactory.createForClass(Command);

CommandSchema.add(BaseDocumentSchema);
