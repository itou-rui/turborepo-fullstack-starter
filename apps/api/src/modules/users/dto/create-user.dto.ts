import { IsString, IsNotEmpty } from 'class-validator';
import type { RESTPostAPIUserJSONBody } from '@workspace/types';

export class CreateUserDto implements RESTPostAPIUserJSONBody {
  @IsString()
  @IsNotEmpty()
  uid!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  secondName!: string;
}
