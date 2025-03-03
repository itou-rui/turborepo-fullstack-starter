import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { APIUser, type IUser, type RESTPostAPIUserJSONBody } from '@workspace/types';
import { User, type UserModel } from 'database/main';

export class UsersService {
  constructor(
    @InjectModel(User.name, 'main')
    private userModel: UserModel,
  ) {}

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

  /**
   * Retrieves all users from the database.
   */
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   */
  async findOneById(id: string): Promise<User | null> {
    return await this.userModel.findById(new Types.ObjectId(id));
  }

  async findByLocalProviderEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({
      'providers.local.email': email,
    });
  }

  /**
   * Creates a new user in the database.
   * @param data - The data to create the user with.
   */
  async create(data: RESTPostAPIUserJSONBody): Promise<User> {
    return await this.userModel.create(data);
  }
}
