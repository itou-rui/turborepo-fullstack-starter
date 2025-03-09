import { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProviderType } from '@workspace/constants';
import { Session, type SessionModel } from '../schemas';
import { ISessionModel, OmitBaseModelFields } from '@workspace/types';

export interface IDiscordAuthRepository {
  findByObjectId(_id: Types.ObjectId): Promise<Session | null>;
  findByUserId(uid: string): Promise<Session | null>;
  findByAccessToken(accessToken: string): Promise<Session | null>;
  create(data: Omit<ISessionModel, OmitBaseModelFields>): Promise<Session>;
}

export class DiscordAuthRepository {
  constructor(
    @InjectModel(Session.name, 'main')
    private sessionModel: SessionModel,
  ) {}

  /**
   * Finds a session by its ObjectId.
   * @param _id - The ObjectId of the session.
   * @returns A promise that resolves to the session or null if not found.
   */
  findByObjectId(_id: Types.ObjectId): Promise<Session | null> {
    return this.sessionModel.findOne({ _id, provider: ProviderType.Discord });
  }

  /**
   * Finds a session by the user ID.
   * @param uid - The user ID associated with the session.
   * @returns A promise that resolves to the session or null if not found.
   */
  findByUserId(uid: string): Promise<Session | null> {
    return this.sessionModel.findOne({ userId: uid, provider: ProviderType.Discord });
  }

  /**
   * Finds a session by the access token.
   * @param accessToken - The access token associated with the session.
   * @returns A promise that resolves to the session or null if not found.
   */
  findByAccessToken(accessToken: string): Promise<Session | null> {
    return this.sessionModel.findOne({ accessToken, provider: ProviderType.Discord });
  }

  /**
   * Creates a new session.
   * @param data - The session data to create.
   * @returns A promise that resolves to the created session.
   */
  create(data: { uuid: string; discordId: string; username: string }): Promise<Session> {
    return this.sessionModel.create({
      provider: ProviderType.Discord,
      ...data,
    });
  }
}
