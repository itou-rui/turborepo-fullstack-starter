import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidV4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import { ProviderType } from '@workspace/constants';
import { Session } from 'database/main';
import { ResourceAlreadyExistsException } from 'utils/exceptions';
import { UsersService, User } from '../../users';
import { SessionService } from '../../session';
import { RegisterLocalUserDto } from '../dto';

@Injectable()
export class LocalAuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByLocalProviderEmail(email);
    if (user?.providers?.local?.password == null) {
      return null;
    }
    if (await bcryptjs.compare(password, user.providers.local.password)) {
      return user;
    }
    return null;
  }

  /**
   * Hashes a password using bcrypt.
   * @param password - The password to hash.
   * @returns The hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt();
    return await bcryptjs.hash(password, salt);
  }

  /**
   * Registers a new user with the provided data.
   * @param data - The data for the new user.
   * @returns The created user.
   * @throws ResourceAlreadyExistsException if a user with the given email already exists.
   */
  async register(data: RegisterLocalUserDto): Promise<User> {
    const user = await this.usersService.findByLocalProviderEmail(data.email);
    if (user) {
      throw new ResourceAlreadyExistsException(0, 'User with this email already exists');
    }

    const hashedPassword = await this.hashPassword(data.password);
    return await this.usersService.create({
      uuid: uuidV4(),
      username: data.username,
      providers: {
        local: { email: data.email, password: hashedPassword },
      },
    });
  }

  /**
   * Logs in a user and creates/updates a session.
   * @param user - The user to log in.
   * @returns The created/updated session.
   */
  async login(user: User): Promise<Session> {
    const payload = { uuid: user.uuid, username: user.username, email: user.providers?.local?.email };
    const accessToken = this.jwtService.sign(payload);
    return await this.sessionService.findAndUpdate({
      userId: user.uuid,
      provider: ProviderType.Local,
      accessToken,
      profile: new Map<string, any>([
        ['uuid', user.uuid],
        ['username', user.username],
        ['email', user.providers?.local?.email],
      ]),
    });
  }
}
