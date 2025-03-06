import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import type { RESTPostAPIUserJSON } from '@workspace/types';

export class CreateUserDto implements RESTPostAPIUserJSON {
  @IsString()
  @IsNotEmpty()
  uuid!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
