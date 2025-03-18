import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users';
import { LocalAuthService, LocalAuthController, LocalStrategy, LocalAuthSessionSerializer } from './local';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [LocalAuthController],
  providers: [LocalAuthService, LocalStrategy, LocalAuthSessionSerializer],
  exports: [LocalAuthService],
})
export class AuthModule {}
