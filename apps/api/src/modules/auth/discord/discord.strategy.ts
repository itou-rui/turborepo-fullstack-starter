import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { type Profile as DiscordProfile, Strategy } from 'passport-discord';
import { EnvironmentVariables } from 'config/env-varidation';
import { DiscordAuthService } from './discord.service';

type Done = (error: Error | null, profile: DiscordProfile) => void;

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

  async validate(accessToken: string, refreshToken: string, profile: DiscordProfile, done: Done) {
    const user = await this.discordAuthService.validateUser(profile);
    await this.discordAuthService.validateOAuth2(user, profile, accessToken, refreshToken);
    done(null, profile);
  }
}
