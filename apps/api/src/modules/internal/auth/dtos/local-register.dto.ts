import { IsString, IsNotEmpty } from 'class-validator';
import { type RESTPostAPIAuthLocalRegisterJSON } from '@workspace/types';

export class RegisterLocalUserDto implements RESTPostAPIAuthLocalRegisterJSON {
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
