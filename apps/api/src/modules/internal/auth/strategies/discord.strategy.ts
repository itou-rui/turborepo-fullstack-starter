import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { type Profile as DiscordProfile, Strategy } from 'passport-discord';
import { EnvironmentVariables } from 'config/env-varidation';
import { DiscordAuthService } from '../services';

type Done = (error: Error | null, profile: DiscordProfile | null) => void;

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected readonly configService: ConfigService<EnvironmentVariables>,
    private readonly discordAuthService: DiscordAuthService,
  ) {
    super({
      clientID: configService.get('DISCORD_CLIENT_ID')!,
      clientSecret: configService.get('DISCORD_CLIENT_SECRET')!,
      callbackURL: configService.get('BASE_URL') + '/api/auth/discord/callback',
      scope: ['identify', 'email', 'guilds', 'guilds.join'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: DiscordProfile, done: Done) {
    await this.discordAuthService.validateUser(profile);
    done(null, profile);
  }
}
