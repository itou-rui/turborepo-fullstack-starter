import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';
import type { ISession, OmmitedBaseModelFields } from '@workspace/types';
import type { ProviderType } from '@workspace/constants';

export class CreateSessionDto implements Omit<ISession, OmmitedBaseModelFields> {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  provider!: ProviderType;

  @IsString()
  @IsNotEmpty()
  accessToken?: string;

  @IsString()
  @IsNotEmpty()
  refreshToken?: string;

  @IsString()
  @IsNotEmpty()
  tokenExpires?: string;

  @IsObject()
  @IsOptional()
  profile?: Record<string, any>;
}
