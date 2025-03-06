import { Injectable } from '@nestjs/common';
import { type APIUser, type IUserModel, type RESTPostAPIUserJSON } from '@workspace/types';
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

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOneById(id);
  }

  findByLocalProviderEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneByLocalProviderEmail(email);
  }

  create(data: RESTPostAPIUserJSON & { password: string }): Promise<User> {
    return this.usersRepository.create(data);
  }
}
