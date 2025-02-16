import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { type APIUser, type RESTGetAPIUserResult, type RESTPostAPIUserJSONBody } from '@workspace/types';
import { User, type UserModel } from 'database/main';

export class UsersService {
  constructor(
    @InjectModel(User.name, 'main')
    private userModel: UserModel,
  ) {}

  /**
   * Converts a User document to an APIUser object.
   * @param user - The User document to convert.
   */
  private toAPIUser(user: User): APIUser {
    return {
      _id: user._id.toString(),
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      createdAtTimestamp: user.createdAtTimestamp,
      updatedAt: user.updatedAt,
      updatedAtTimestamp: user.updatedAtTimestamp,
    };
  }

  /**
   * Converts an APIUser object to a public APIUser object by excluding the password.
   * @param user - The APIUser object to convert.
   */
  private toAPIUserPublic(user: APIUser): RESTGetAPIUserResult {
    const { password, ...publicUser } = user;
    return publicUser;
  }

  /**
   * Retrieves all users from the database.
   */
  async findAll(): Promise<RESTGetAPIUserResult[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => this.toAPIUserPublic(this.toAPIUser(user)));
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   */
  async findOneById(id: string): Promise<RESTGetAPIUserResult | null> {
    const user = await this.userModel.findById(new Types.ObjectId(id));
    return user ? this.toAPIUserPublic(this.toAPIUser(user)) : null;
  }

  /**
   * Creates a new user in the database.
   * @param data - The data to create the user with.
   */
  async create(data: RESTPostAPIUserJSONBody): Promise<RESTGetAPIUserResult> {
    const user = await this.userModel.create(data);
    return this.toAPIUserPublic(this.toAPIUser(user));
  }
}
