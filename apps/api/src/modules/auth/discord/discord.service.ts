import { Injectable } from '@nestjs/common';
import { type Profile as DiscordProfile } from 'passport-discord';
import { v4 as uuidV4 } from 'uuid';
import { ProviderType } from '@workspace/constants';
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

  findSessionByAccessToken(accessToken: string): Promise<Session | null> {
    return this.discordAuthRepository.findByAccessToken(accessToken);
  }

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

  /**
   * Creates a new session for the user with the given access and refresh tokens.
   * @param user - The user for whom the session is created.
   * @param accessToken - The access token for the session.
   * @param refreshToken - The refresh token for the session.
   * @param profile - The Discord profile of the user.
   * @returns A promise that resolves to the created session.
   */
  createSession(user: User, accessToken: string, refreshToken: string, profile: DiscordProfile): Promise<Session> {
    return this.discordAuthRepository.create({
      uid: uuidV4(),
      user: user._id,
      provider: ProviderType.Discord,
      accessToken,
      refreshToken,
      profile,
    });
  }

  /**
   * Finds and updates an existing session with the given access and refresh tokens.
   * @param accessToken - The access token for the session.
   * @param refreshToken - The refresh token for the session.
   * @param profile - The Discord profile of the user.
   * @returns A promise that resolves to the updated session or null if not found.
   */
  findOneAndUpdateSession(accessToken: string, refreshToken: string, profile: DiscordProfile): Promise<Session | null> {
    return this.discordAuthRepository.findOneAndUpdate({
      accessToken,
      refreshToken,
      profile,
    });
  }

  /**
   * Validates an OAuth2 session for the user.
   * If an existing session is found, it is updated. Otherwise, a new session is created.
   * @param user - The user for whom the session is validated.
   * @param profile - The Discord profile of the user.
   * @param accessToken - The access token for the session.
   * @param refreshToken - The refresh token for the session.
   * @returns A promise that resolves to the validated or created session.
   */
  async validateOAuth2(user: User, profile: DiscordProfile, accessToken: string, refreshToken: string): Promise<Session> {
    const session = await this.findOneAndUpdateSession(accessToken, refreshToken, profile);
    if (session) return session;
    return this.createSession(user, accessToken, refreshToken, profile);
  }
}
