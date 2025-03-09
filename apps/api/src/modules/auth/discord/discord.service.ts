import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-discord';
import { v4 as uuidV4 } from 'uuid';
import { User, UsersService } from '../../users';
import { DiscordAuthRepository } from './discord.repository';

@Injectable()
export class DiscordAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly discordAuthRepository: DiscordAuthRepository,
  ) {}

  async validateUser(profile: Profile): Promise<User> {
    const user = await this.usersService.findByDiscordId(profile.id);

    if (user === null) {
      return this.usersService.create({
        uid: uuidV4(),
        username: profile.username,
      });
    }

    return user;
  }
}
