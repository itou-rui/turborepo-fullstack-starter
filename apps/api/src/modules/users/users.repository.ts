import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User, type UserModel } from './schemas';
import { type CreateUserDatails, type IUserModel } from '@workspace/types';

export interface IUsersRepository {
  exists(filter: Partial<IUserModel>): Promise<Types.ObjectId | undefined>;
  findAll(): Promise<User[]>;
  findOneById(id: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDatails): Promise<User>;
}

export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel(User.name, 'main')
    private userModel: UserModel,
  ) {}

  /**
   * Checks if a user exists based on the provided filter.
   * @param filter - Partial filter object to search for the user.
   */
  async exists(filter: Partial<IUserModel>): Promise<Types.ObjectId | undefined> {
    const result = await this.userModel.exists(filter).exec();
    return result?._id;
  }

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
    return this.userModel.findById(_id).exec();
  }

  /**
   * Finds a user by their local provider email.
   * @param email - The email of the user to find.
   */
  findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  /**
   * Creates a new user in the database.
   * @param data - The data to create the user with.
   */
  create(data: CreateUserDatails): Promise<User> {
    return this.userModel.create(data);
  }
}
