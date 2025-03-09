import { Injectable } from '@nestjs/common';
import { type Profile as DiscordProfile } from 'passport-discord';
import { v4 as uuidV4 } from 'uuid';
import { type APISession, type ISessionModel } from '@workspace/types';
import { User, UsersService } from '../../users';
import { Session } from '../schemas';
import { DiscordAuthRepository } from './discord.repository';

@Injectable()
export class DiscordAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly discordAuthRepository: DiscordAuthRepository,
  ) {}

  /**
   * Converts a Session object to an APISession object.
   * @param session - The session object to convert.
   * @returns The converted APISession object.
   */
  toAPISession(session: Session): APISession<DiscordProfile> {
    const { _id, _version, index, createdAt, updatedAt, user, ...rest } = session.toObject() as ISessionModel<DiscordProfile>;
    return rest;
  }

  async validateUser(profile: DiscordProfile): Promise<User> {
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
