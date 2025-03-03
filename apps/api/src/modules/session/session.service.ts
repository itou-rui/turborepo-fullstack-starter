import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Session, type SessionModel } from 'database/main';
import { CreateSessionDto } from './dto';
import { APISession, ISession } from '@workspace/types';

export class SessionService {
  constructor(
    @InjectModel(Session.name, 'main')
    private sessionModel: SessionModel,
  ) {}

  /**
   * Converts a Session object to an APISession object.
   * @param session - The session object to convert.
   * @returns The converted APISession object.
   */
  toAPISession(session: Session): APISession {
    const { ...rest } = session.toObject() as ISession;
    return rest;
  }

  /**
   * Validates a session token and returns the associated session.
   * @param token - The session token to validate.
   * @returns The validated session or null if invalid.
   */
  async validateSession(token: string): Promise<Session | null> {
    const session = await this.findByAccessToken(token);

    if (!session) {
      return null;
    }

    if (session.tokenExpires && new Date(session.tokenExpires) < new Date()) {
      return null;
    }

    return session;
  }

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
  async findAndUpdate(data: CreateSessionDto): Promise<Session> {
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
  async create(data: CreateSessionDto): Promise<Session> {
    return await this.sessionModel.create(data);
  }
}
