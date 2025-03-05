import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Session, type SessionModel } from '../schemas';
import { ISession, OmmitedBaseModelFields } from '@workspace/types';

export interface ILocalAuthRepository {
  findByObjectId(id: string): Promise<Session | null>;
  findByUserObjectId(id: string): Promise<Session | null>;
  findByAccessToken(accessToken: string): Promise<Session | null>;
  findAndUpdate(data: Omit<ISession, OmmitedBaseModelFields>): Promise<Session>;
  create(data: Omit<ISession, OmmitedBaseModelFields>): Promise<Session>;
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
  async findByObjectId(id: string): Promise<Session | null> {
    return await this.sessionModel.findById(new Types.ObjectId(id));
  }

  /**
   * Finds a session by the user's ObjectId.
   * @param id - The ObjectId of the user whose session to find.
   * @returns The found session or null if not found.
   */
  async findByUserObjectId(id: string): Promise<Session | null> {
    return await this.sessionModel.findOne({ user: new Types.ObjectId(id) });
  }

  /**
   * Finds a session by its access token.
   * @param accessToken - The access token of the session to find.
   * @returns The found session or null if not found.
   */
  async findByAccessToken(accessToken: string): Promise<Session | null> {
    return await this.sessionModel.findOne({ accessToken });
  }

  /**
   * Finds and updates a session based on the provided data.
   * @param data - The data to update the session with.
   * @returns The updated session.
   */
  async findAndUpdate(data: Omit<ISession, OmmitedBaseModelFields>): Promise<Session> {
    return await this.sessionModel.findOneAndUpdate(
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
  async create(data: Omit<ISession, OmmitedBaseModelFields>): Promise<Session> {
    return await this.sessionModel.create(data);
  }
}
