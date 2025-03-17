import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidV4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import { LocalAuthProfile, type APISession, type ISessionModel } from '@workspace/types';
import { ProviderType } from '@workspace/constants';
import { ResourceAlreadyExistsException, InvalidCredentialsException } from 'utils/exceptions';
import { UsersService, User } from '../../users';
import { Session } from '../schemas';
import { RegisterLocalUserDto } from './dtos';
import { LocalAuthRepository } from './local.repository';

@Injectable()
export class LocalAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly localAuthRepository: LocalAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Converts a Session object to an APISession object.
   * @param session - The session object to convert.
   * @returns The converted APISession object.
   */
  toAPISession(session: Session): APISession<LocalAuthProfile> {
    const { _id, _version, index, createdAt, updatedAt, user, ...rest } = session.toObject() as ISessionModel<LocalAuthProfile>;
    return rest;
  }

  /**
   * Hashes a password using bcrypt.
   * @param password - The password to hash.
   * @returns The hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt();
    return bcryptjs.hash(password, salt);
  }

  /**
   * Signs a JWT token with the given payload.
   *
   * @param payload - The payload to sign the token with.
   */
  signToken(payload: LocalAuthProfile): string {
    return this.jwtService.sign(payload);
  }

  /**
   * Validates if a user with the given email can be registered.
   *
   * @param email - The email address to check.
   */
  async validateRegisterUser(email: string) {
    const isExists = await this.usersService.exists({ email });
    if (isExists) {
      throw new ResourceAlreadyExistsException(0, 'User with this email already exists');
    }
  }

  /**
   * Registers a new user with the provided data.
   * @param data - The data for the new user.
   */
  async register(data: RegisterLocalUserDto): Promise<Session> {
    await this.validateRegisterUser(data.email);

    const { password, ...rest } = data;
    const uid = uuidV4();
    const hashedPassword = await this.hashPassword(data.password);
    const user = await this.usersService.create({ uid, ...rest, password: hashedPassword });

    const profile: LocalAuthProfile = { uid, username: data.username, email: data.email };
    const accessToken = this.signToken(profile);
    return this.localAuthRepository.create({ uid: uuidV4(), user: user._id, provider: ProviderType.Local, accessToken, profile });
  }

  /**
   * Validates the login credentials of a user.
   *
   * @param email - The email address of the user.
   * @param password - The password of the user.
   */
  async validateLoginUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (user === null) {
      throw new InvalidCredentialsException('Invalid email or password');
    }
    if (user.password == null) {
      throw new InvalidCredentialsException('Password is not set for this account');
    }
    if (!(await bcryptjs.compare(password, user.password))) {
      throw new InvalidCredentialsException('Invalid email or password');
    }
    return user;
  }

  /**
   * Logs in a user and creates/updates a session.
   * @param user - The user to log in.
   */
  async login(email: string, password: string): Promise<Session> {
    const user = await this.validateLoginUser(email, password);
    const accessToken = this.signToken({ uid: user.uid, username: user.username, email: email });
    return this.localAuthRepository.findByUidAndUpdate(user.uid, {
      user: user._id,
      provider: ProviderType.Local,
      accessToken,
    });
  }

  validateSessionExpire(tokenExpires: string): boolean {
    return new Date(tokenExpires) >= new Date();
  }

  async getSessionByToken(token: string): Promise<Session | null> {
    const session = await this.localAuthRepository.findByAccessToken(token);
    if (session === null) {
      return null;
    }
    if (session.tokenExpires && !this.validateSessionExpire(session.tokenExpires)) {
      return null;
    }
    return session;
  }

  getProfileFromToken(token: string): LocalAuthProfile {
    return this.jwtService.decode(token) as LocalAuthProfile;
  }
}
