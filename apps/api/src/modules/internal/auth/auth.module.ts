import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users';
import { LocalAuthController } from './controllers';
import { LocalAuthService } from './services';
import { LocalAuthSessionSerializer } from './session-serializers/';
import { LocalStrategy } from './strategies/';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [LocalAuthController],
  providers: [LocalAuthService, LocalStrategy, LocalAuthSessionSerializer],
  exports: [LocalAuthService],
})
export class AuthModule {}
