import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users';
import { LocalAuthService, LocalAuthController, LocalStrategy, LocalAuthSessionSerializer } from './local';
import { DiscordAuthController, DiscordAuthService, DiscordStrategy, DiscordAuthSessionSerializer } from './discord';

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
