import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { APIGuild, type RESTPostAPIGuildJSONBody } from '@workspace/types';
import { Guild, type GuildModel } from 'database/discord';

export class GuilldsService {
  constructor(
    @InjectModel(Guild.name, 'discord')
    private guildModel: GuildModel,
  ) {}

  /**
   * Converts a Guild instance to an APIGuild object.
   * @param guild - The Guild instance to convert.
   * @returns The converted APIGuild object.
   */
  toAPIGuild(guild: Guild): APIGuild {
    return guild.toObject();
  }

  /**
   * Retrieves all guilds from the database.
   */
  async findAll(): Promise<Guild[]> {
    return await this.guildModel.find().exec();
  }

  /**
   * Retrieves a guild by their ID.
   * @param id - The ID of the guild to retrieve.
   */
  async findOneById(id: string): Promise<Guild | null> {
    return await this.guildModel.findById(new Types.ObjectId(id));
  }

  /**
   * Finds a guild by its unique identifier (UID).
   * @param uid - The unique identifier of the guild.
   */
  async findByUid(uid: string): Promise<Guild | null> {
    return await this.guildModel.findOne({ uid });
  }

  /**
   * Creates a new user in the database.
   * @param data - The data to create the guild with.
   */
  async create(data: RESTPostAPIGuildJSONBody): Promise<Guild> {
    return await this.guildModel.create(data);
  }
}
