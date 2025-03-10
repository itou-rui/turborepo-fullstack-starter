import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Profile as DiscordProfile } from 'passport-discord';
import { DiscordAuthService } from './discord.service';

export type Done = (error: Error | null, profile: DiscordProfile | null) => void;

@Injectable()
export class DiscordSessionSerializer extends PassportSerializer {
  constructor(private discordAuthService: DiscordAuthService) {
    super();
  }

  serializeUser(profile: DiscordProfile, done: Done): void {
    done(null, profile);
  }

  async deserializeUser(profile: DiscordProfile, done: Done): Promise<void> {
    const user = await this.discordAuthService.findUserByDiscordId(profile.id);
    done(null, user ? profile : null);
  }
}
