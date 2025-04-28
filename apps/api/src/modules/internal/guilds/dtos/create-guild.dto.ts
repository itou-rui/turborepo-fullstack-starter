import { IsString, IsNotEmpty } from 'class-validator';
import type { RESTPostAPIGuildJSON } from '@workspace/types';

export class CreateGuildDto implements RESTPostAPIGuildJSON {
  @IsString()
  @IsNotEmpty()
  uid!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
