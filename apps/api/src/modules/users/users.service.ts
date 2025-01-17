import { InjectModel } from '@nestjs/mongoose';
import { type Model, Types } from 'mongoose';
import { User, type UserDocument } from '../../database';
import { CreateUserDto } from './dto';

export class UsersService {
  constructor(
    @InjectModel(User.name, 'main')
    private userModel: Model<UserDocument>,
  ) {}

  /**
   *
   */
  async findAll() {
    return await this.userModel.find().exec();
  }

  /**
   *
   */
  async findOneById(id: string) {
    return await this.userModel.findById(new Types.ObjectId(id));
  }

  /**
   *
   */
  async findOneByDiscordId(discordId: string) {
    return await this.userModel.findOne({ discordId });
  }

  /**
   *
   */
  async create(data: CreateUserDto) {
    return await this.userModel.create(data);
  }
}
