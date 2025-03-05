import { IsString, IsNotEmpty } from 'class-validator';
import type { RESTPostAPIAuthLocalRegisterJSONBody } from '@workspace/types';

export class RegisterLocalUserDto implements RESTPostAPIAuthLocalRegisterJSONBody {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
