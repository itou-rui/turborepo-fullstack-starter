import { InjectModel } from '@nestjs/mongoose';
import { RootFilterQuery, type Types } from 'mongoose';
import { type CreateUserDatails, type IUserModel } from '@workspace/types';
import { User, type UserModel } from '../schemas';

export interface IUsersRepository {
  exists(filter: RootFilterQuery<IUserModel>): Promise<Types.ObjectId | undefined>;
  find(filter: RootFilterQuery<IUserModel>): Promise<User[]>;
  findAll(): Promise<User[]>;
  findOneByObjectId(_id: Types.ObjectId): Promise<User | null>;
  findOneByUid(uid: string): Promise<User | null>;
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
  async exists(filter: RootFilterQuery<Partial<IUserModel>> = {}): Promise<Types.ObjectId | undefined> {
    const result = await this.userModel.exists(filter).exec();
    return result?._id;
  }

  /**
   * Finds users based on the provided filter.
   * @param {RootFilterQuery<IUserModel>} filter - The filter criteria for finding users.
   */
  find(filter: RootFilterQuery<IUserModel> = {}): Promise<User[]> {
    return this.userModel.find(filter).exec();
  }

  /**
   * Finds a single user based on the provided filter.
   * @param {RootFilterQuery<IUserModel>} filter - The filter criteria for finding a user.
   */
  findOne(filter: RootFilterQuery<IUserModel>): Promise<User | null> {
    return this.userModel.findOne(filter).exec();
  }

  /**
   * Retrieves all users from the database.
   */
  findAll(): Promise<User[]> {
    return this.find({});
  }

  /**
   * Finds a user by their ID.
   * @param {Types.ObjectId} _id - The ID of the user to find.
   */
  findOneByObjectId(_id: Types.ObjectId): Promise<User | null> {
    return this.findOne({ _id });
  }

  /**
   * Finds a user by their UID.
   * @param {string} uid - The UID of the user to find.
   */
  findOneByUid(uid: string): Promise<User | null> {
    return this.findOne({ uid });
  }

  /**
   * Finds a user by their local provider email.
   * @param email - The email of the user to find.
   */
  findOneByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }

  /**
   * Creates a new user in the database.
   * @param data - The data to create the user with.
   */
  create(data: CreateUserDatails): Promise<User> {
    return this.userModel.create(data);
  }
}
