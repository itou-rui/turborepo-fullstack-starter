import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { EnvironmentVariables } from 'config/env-varidation';
import { User } from '../../users';
import { DiscordAuthService } from './discord.service';

type Done = (error: any, user?: User) => void;

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly discordAuthService: DiscordAuthService,
  ) {
    super({
      clientID: configService.get('DISCORD_CLIENT_ID')!,
      clientSecret: configService.get('DISCORD_CLIENT_SECRET')!,
      callbackURL: '/auth/discord/callback',
      scope: ['identify', 'email', 'guilds', 'guilds.join'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: Done) {
    const user = await this.discordAuthService.validateUser(profile);
    done(null, user);
  }
}
