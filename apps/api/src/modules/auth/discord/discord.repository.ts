import { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { type Profile as DiscordProfile } from 'passport-discord';
import { ProviderType } from '@workspace/constants';
import { type UpdateSessionDetails, type CreateSessionDetails } from '@workspace/types';
import { Session, type SessionModel } from '../schemas';

export interface IDiscordAuthRepository {
  findByObjectId(_id: Types.ObjectId): Promise<Session | null>;
  findByUid(uid: string): Promise<Session | null>;
  findByAccessToken(accessToken: string): Promise<Session | null>;
  findOneAndUpdate(accessToken: string, data: UpdateSessionDetails<DiscordProfile>): Promise<Session | null>;
  create(data: CreateSessionDetails<DiscordProfile>): Promise<Session>;
}

export class DiscordAuthRepository {
  private populateFields = 'user';

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
    return this.sessionModel.findOne({ _id, provider: ProviderType.Discord }).populate(this.populateFields).exec();
  }

  /**
   * Finds a session by user ID.
   * @param uid - The unique identifier of the user.
   * @returns A promise that resolves to the session if found, otherwise null.
   */
  findByUid(uid: string): Promise<Session | null> {
    return this.sessionModel.findOne({ uid, provider: ProviderType.Discord }).populate(this.populateFields).exec();
  }

  /**
   * Finds a session by the access token.
   * @param accessToken - The access token associated with the session.
   * @returns A promise that resolves to the session or null if not found.
   */
  findByAccessToken(accessToken: string): Promise<Session | null> {
    return this.sessionModel.findOne({ accessToken, provider: ProviderType.Discord }).populate(this.populateFields).exec();
  }

  /**
   * Finds a session by access token and updates it with the provided data.
   * @param accessToken - The access token of the session to find.
   * @param data - The data to update the session with.
   * @returns A promise that resolves to the updated session or null if no session was found.
   */
  findOneAndUpdate(data: UpdateSessionDetails<DiscordProfile>): Promise<Session | null> {
    return this.sessionModel.findOneAndUpdate(
      { provider: ProviderType.Discord, 'profile.id': data.profile?.id },
      { $set: data },
      { new: true },
    );
  }

  /**
   * Creates a new session for a Discord user.
   * @param data - The details required to create a new session, including the Discord profile.
   * @returns A promise that resolves to the created session.
   */
  async create(data: CreateSessionDetails<DiscordProfile>): Promise<Session> {
    const session = await this.sessionModel.create({
      ...data,
      provider: ProviderType.Discord,
    });
    return session.populate(this.populateFields);
  }
}
