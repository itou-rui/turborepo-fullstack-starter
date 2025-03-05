import { IsString, IsNotEmpty } from 'class-validator';
import type { RESTPostAPIGuildJSONBody } from '@workspace/types';

export class CreateGuildDto implements RESTPostAPIGuildJSONBody {
  @IsString()
  @IsNotEmpty()
  uid!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
