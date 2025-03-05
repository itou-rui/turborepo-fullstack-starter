import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import type { IUserProviders, RESTPostAPIUserJSONBody } from '@workspace/types';

export class CreateUserDto implements RESTPostAPIUserJSONBody {
  @IsString()
  @IsNotEmpty()
  uuid!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsObject()
  @IsOptional()
  providers?: IUserProviders;
}
