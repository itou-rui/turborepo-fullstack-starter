import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Profile as DiscordProfile } from 'passport-discord';

export type Done = (error: Error | null, profile: DiscordProfile | null) => void;

@Injectable()
export class DiscordAuthSessionSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(profile: DiscordProfile, done: Done): void {
    done(null, profile);
  }

  deserializeUser(profile: DiscordProfile, done: Done) {
    done(null, profile);
  }
}
