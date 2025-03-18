import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { type CreateUserDatails, type APIUser, type IUserModel } from '@workspace/types';
import { UserAlreadyExistsException } from 'utils/exceptions';
import { User } from './schemas';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  /**
   * Converts an APIUser object to a public APIUser object by excluding the password.
   * @param user - The APIUser object to convert.
   */
  toAPIUser(user: User): APIUser {
    const { password, ...rest } = user.toObject() as IUserModel;
    return {
      ...rest,
      _id: rest._id.toString(),
      createdAt: rest.createdAt.toISOString(),
      updatedAt: rest.updatedAt.toISOString(),
    };
  }

  toIUser(user: User): IUserModel {
    return user.toObject();
  }

  exists(filter: Partial<IUserModel>): Promise<Types.ObjectId | undefined> {
    return this.usersRepository.exists(filter);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOneByUid(uid: string): Promise<User | null> {
    return this.usersRepository.findOneByUid(uid);
  }

  findOneByObjectId(_id: string): Promise<User | null> {
    const objectId = new Types.ObjectId(_id);
    return this.usersRepository.findOneByObjectId(objectId);
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneByEmail(email);
  }

  async validateCreate(email: string) {
    const isExists = await this.exists({ email });
    if (isExists) {
      throw new UserAlreadyExistsException('Email address already in use.', {
        code: 'USER_ALREADY_EXISTS',
        message: 'The user associated with the specified email address already exists.',
      });
    }
  }

  async create(data: CreateUserDatails): Promise<User> {
    await this.validateCreate(data.email!);
    return this.usersRepository.create(data);
  }
}
