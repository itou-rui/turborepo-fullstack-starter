import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { type ISessionModel, type OmitBaseModelFields } from '@workspace/types';
import { Session, type SessionModel } from '../schemas';

export interface ILocalAuthRepository {
  findByObjectId(id: string): Promise<Session | null>;
  findByUserObjectId(id: string): Promise<Session | null>;
  findByAccessToken(accessToken: string): Promise<Session | null>;
  findAndUpdate(data: Omit<ISessionModel, OmitBaseModelFields>): Promise<Session>;
  create(data: Omit<ISessionModel, OmitBaseModelFields>): Promise<Session>;
}

export class LocalAuthRepository implements ILocalAuthRepository {
  constructor(
    @InjectModel(Session.name, 'main')
    private sessionModel: SessionModel,
  ) {}

  /**
   * Finds a session by its ObjectId.
   * @param id - The ObjectId of the session to find.
   * @returns The found session or null if not found.
   */
  findByObjectId(id: string): Promise<Session | null> {
    return this.sessionModel.findById(new Types.ObjectId(id));
  }

  /**
   * Finds a session by the user's ObjectId.
   * @param id - The ObjectId of the user whose session to find.
   * @returns The found session or null if not found.
   */
  findByUserObjectId(id: string): Promise<Session | null> {
    return this.sessionModel.findOne({ user: new Types.ObjectId(id) });
  }

  /**
   * Finds a session by its access token.
   * @param accessToken - The access token of the session to find.
   * @returns The found session or null if not found.
   */
  findByAccessToken(accessToken: string): Promise<Session | null> {
    return this.sessionModel.findOne({ accessToken });
  }

  /**
   * Finds and updates a session based on the provided data.
   * @param data - The data to update the session with.
   * @returns The updated session.
   */
  findAndUpdate(data: Omit<ISessionModel, OmitBaseModelFields>): Promise<Session> {
    return this.sessionModel.findOneAndUpdate(
      { userId: data.userId, provider: data.provider },
      { $set: data },
      { upsert: true, new: true },
    );
  }

  /**
   * Creates a new session based on the provided data.
   * @param data - The data to create the session with.
   * @returns The created session.
   */
  create(data: Omit<ISessionModel, OmitBaseModelFields>): Promise<Session> {
    return this.sessionModel.create(data);
  }
}
