import { Injectable } from '@nestjs/common';
import { APIUser, type IUser, type RESTPostAPIUserJSONBody } from '@workspace/types';
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
    const plainUser = user.toObject() as IUser;
    const { providers, ...rest } = plainUser;
    const { local, ...otherProviders } = providers ?? {};
    const { password, ...localWithoutPassword } = local ?? {};
    return { ...rest, providers: { ...otherProviders, local: localWithoutPassword } };
  }

  toIUser(user: User): IUser {
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

  create(data: RESTPostAPIUserJSONBody): Promise<User> {
    return this.usersRepository.create(data);
  }
}
