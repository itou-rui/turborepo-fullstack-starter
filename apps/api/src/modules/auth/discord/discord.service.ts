import { Injectable } from '@nestjs/common';
import { type Profile as DiscordProfile } from 'passport-discord';
import { v4 as uuidV4 } from 'uuid';
import { User, UsersService } from '../../users';

@Injectable()
export class DiscordAuthService {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Finds a user by their Discord ID.
   * @param discordId - The Discord ID of the user.
   * @returns A promise that resolves to the user or null if not found.
   */
  findUserByDiscordId(discordId: string): Promise<User | null> {
    return this.usersService.findByDiscordId(discordId);
  }

  /**
   * Creates a new user with the given Discord ID and username.
   * @param discordId - The Discord ID of the user.
   * @param username - The username of the user.
   * @returns A promise that resolves to the created user.
   */
  createUser(discordId: string, username: string): Promise<User> {
    return this.usersService.create({ uid: uuidV4(), discordId, username });
  }

  /**
   * Validates a user based on their Discord profile.
   * If the user does not exist, a new user is created.
   * @param profile - The Discord profile of the user.
   * @returns A promise that resolves to the validated or created user.
   */
  async validateUser(profile: DiscordProfile): Promise<User> {
    const user = await this.findUserByDiscordId(profile.id);
    if (user) return user;
    return this.createUser(profile.id, profile.username);
  }
}
