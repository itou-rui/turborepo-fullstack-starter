import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
	@IsString()
	@IsNotEmpty()
	firstName!: string;

	@IsString()
	@IsNotEmpty()
	secondName!: string;
}
