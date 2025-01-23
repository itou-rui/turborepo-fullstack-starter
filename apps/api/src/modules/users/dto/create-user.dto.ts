import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto {
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile!: CreateProfileDto;

  @IsString()
  @IsNotEmpty()
  discordId!: string;
}
