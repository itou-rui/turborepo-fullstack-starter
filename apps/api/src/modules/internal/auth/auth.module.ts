import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users';
import { LocalAuthController, DiscordAuthController } from './controllers';
import { LocalAuthService, DiscordAuthService } from './services';
import { LocalAuthSessionSerializer, DiscordAuthSessionSerializer } from './session-serializers/';
import { LocalStrategy, DiscordStrategy } from './strategies/';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [LocalAuthController, DiscordAuthController],
  providers: [
    LocalAuthService,
    LocalStrategy,
    LocalAuthSessionSerializer,
    DiscordAuthService,
    DiscordStrategy,
    DiscordAuthSessionSerializer,
  ],
  exports: [LocalAuthService, DiscordAuthService],
})
export class AuthModule {}
