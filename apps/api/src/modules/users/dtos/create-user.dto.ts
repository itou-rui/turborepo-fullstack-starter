import { IsString, IsNotEmpty } from 'class-validator';
import type { RESTPostAPIUserJSON } from '@workspace/types';

export class CreateUserDto implements RESTPostAPIUserJSON {
  @IsString()
  @IsNotEmpty()
  uid!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;
}
