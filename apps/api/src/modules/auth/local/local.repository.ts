import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { type UpdateSessionDetails, type CreateSessionDetails, type LocalAuthProfile } from '@workspace/types';
import { Session, type SessionModel } from '../schemas';
import { ProviderType } from '@workspace/constants';

export interface ILocalAuthRepository {
  findByObjectId(id: Types.ObjectId): Promise<Session | null>;
  findByUserObjectId(id: Types.ObjectId): Promise<Session | null>;
  findByAccessToken(accessToken: string): Promise<Session | null>;
  findByUidAndUpdate(uid: string, data: UpdateSessionDetails<LocalAuthProfile>): Promise<Session>;
  create(data: CreateSessionDetails<LocalAuthProfile>): Promise<Session>;
}

export class LocalAuthRepository implements ILocalAuthRepository {
  private populateFields = 'user';

  constructor(
    @InjectModel(Session.name, 'main')
    private sessionModel: SessionModel,
  ) {}

  /**
   * Finds a session by its ObjectId.
   * @param id - The ObjectId of the session.
   * @returns A promise that resolves to the session or null if not found.
   */
  findByObjectId(id: Types.ObjectId): Promise<Session | null> {
    return this.sessionModel.findOne({ _id: id, provider: ProviderType.Local }).populate(this.populateFields).exec();
  }

  /**
   * Finds a session by the user's ObjectId.
   * @param id - The ObjectId of the user.
   * @returns A promise that resolves to the session or null if not found.
   */
  findByUserObjectId(id: Types.ObjectId): Promise<Session | null> {
    return this.sessionModel.findOne({ user: id, provider: ProviderType.Local }).populate(this.populateFields).exec();
  }

  /**
   * Finds a session by its access token.
   * @param accessToken - The access token of the session.
   * @returns A promise that resolves to the session or null if not found.
   */
  findByAccessToken(accessToken: string): Promise<Session | null> {
    return this.sessionModel.findOne({ accessToken, provider: ProviderType.Local });
  }

  /**
   * Finds a session by its UID and updates it with the provided data.
   * @param uid - The UID of the session.
   * @param data - The data to update the session with.
   * @returns A promise that resolves to the updated session.
   */
  findByUidAndUpdate(uid: string, data: UpdateSessionDetails<LocalAuthProfile>): Promise<Session> {
    return this.sessionModel.findOneAndUpdate({ uid, provider: ProviderType.Local }, { $set: data }, { upsert: true, new: true });
  }

  /**
   * Creates a new session with the provided data.
   * @param data - The data to create the session with.
   * @returns A promise that resolves to the created session.
   */
  create(data: CreateSessionDetails<LocalAuthProfile>): Promise<Session> {
    return this.sessionModel.create(data);
  }
}
