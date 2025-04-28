import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import { AlreadyUserExistsException, InvalidLocalAuthCredentialsException, MissingUserPasswordException } from 'utils/exceptions';
import { UsersService, User } from '../../users';

@Injectable()
export class LocalAuthService {
  constructor(private readonly usersService: UsersService) {}

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
   * Validates if a user can be created with the given email.
   * Checks if the email is already in use.
   * @param email - The email to validate.
   * @throws InvalidCredentialsException if the email is already in use.
   */
  async validateCreateUser(email: string): Promise<void> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) throw new AlreadyUserExistsException('email');

    // TODO: Checking Password Strength
  }

  /**
   * Creates a new user with the given username, email, and password.
   * @param username - The username of the new user.
   * @param email - The email of the new user.
   * @param password - The password of the new user.
   */
  async createUser(username: string, email: string, password: string): Promise<User> {
    await this.validateCreateUser(email);
    const uid = uuidV4();
    const hashedPassword = await this.hashPassword(password);
    return this.usersService.create({ uid, username: username, email, password: hashedPassword });
  }

  /**
   * Validates the login credentials of a user.
   * @param email - The email address of the user.
   * @param password - The password of the user.
   */
  async validateLoginUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new InvalidLocalAuthCredentialsException('email');
    }
    if (!user.password) {
      throw new MissingUserPasswordException();
    }
    if (!(await bcryptjs.compare(password, user.password))) {
      throw new InvalidLocalAuthCredentialsException('password');
    }

    return user;
  }

  /**
   * Validates if the session token has expired.
   * @param tokenExpires - The expiration date of the token as a string.
   */
  validateSessionExpire(tokenExpires: string): boolean {
    return new Date(tokenExpires) >= new Date();
  }

  /**
   * Finds a user by their unique identifier (UID).
   * @param uid - The unique identifier of the user.
   */
  findUserByUid(uid: string): Promise<User | null> {
    return this.usersService.findOneByUid(uid);
  }
}
