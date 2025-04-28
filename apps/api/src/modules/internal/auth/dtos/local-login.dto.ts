import { IsString, IsNotEmpty } from 'class-validator';
import { type RESTPostAPIAuthLocalLoginJSON } from '@workspace/types';

export class LoginLocalDto implements RESTPostAPIAuthLocalLoginJSON {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
