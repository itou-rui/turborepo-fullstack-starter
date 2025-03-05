import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User, type UserModel } from './schemas';
import { type RESTPostAPIUserJSONBody } from '@workspace/types';

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findOneById(id: string): Promise<User | null>;
  findOneByLocalProviderEmail(email: string): Promise<User | null>;
  create(data: RESTPostAPIUserJSONBody): Promise<User>;
}

export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User.name, 'main')
    private userModel: UserModel,
  ) {}

  /**
   * Retrieves all users from the database.
   */
  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   */
  findOneById(id: string): Promise<User | null> {
    const _id = new Types.ObjectId(id);
    return this.userModel.findById(_id);
  }

  /**
   * Finds a user by their local provider email.
   * @param email - The email of the user to find.
   */
  findOneByLocalProviderEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      'providers.local.email': email,
    });
  }

  /**
   * Creates a new user in the database.
   * @param data - The data to create the user with.
   */
  create(data: RESTPostAPIUserJSONBody): Promise<User> {
    return this.userModel.create(data);
  }
}
