import { IsString, IsNotEmpty } from 'class-validator';
import { type RESTPostAPIAuthLocalLoginJSONBody } from '@workspace/types';

export class LoginLocalDto implements RESTPostAPIAuthLocalLoginJSONBody {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
