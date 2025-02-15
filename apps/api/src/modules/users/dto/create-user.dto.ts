import { IsString, IsNotEmpty } from 'class-validator';
import type { RESTPostAPIUserJSONBody } from '@workspace/types';

export class CreateUserDto implements RESTPostAPIUserJSONBody {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
