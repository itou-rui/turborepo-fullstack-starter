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
	 * Retrieves all users from the database.
	 * @returns A promise that resolves to an array of users.
	 */
	async findAll() {
		return await this.userModel.find().exec();
	}

	/**
	 * Retrieves a user by their ID.
	 * @param id - The ID of the user to retrieve.
	 * @returns A promise that resolves to the user document, or null if not found.
	 */
	async findOneById(id: string) {
		return await this.userModel.findById(new Types.ObjectId(id));
	}

	/**
	 * Retrieves a user by their Discord ID.
	 * @param discordId - The Discord ID of the user to retrieve.
	 * @returns A promise that resolves to the user document, or null if not found.
	 */
	async findOneByDiscordId(discordId: string) {
		return await this.userModel.findOne({ discordId });
	}

	/**
	 * Creates a new user in the database.
	 * @param data - The data to create the user with.
	 * @returns A promise that resolves to the created user document.
	 */
	async create(data: CreateUserDto) {
		return await this.userModel.create(data);
	}
}
