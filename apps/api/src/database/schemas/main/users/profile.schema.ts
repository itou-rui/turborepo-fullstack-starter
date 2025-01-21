import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseDocument } from '../../base.schema';

@Schema({ _id: false })
export class Profile extends BaseDocument {
	@Prop({ required: true })
	firstName!: string;

	@Prop({ required: true })
	secondName!: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
