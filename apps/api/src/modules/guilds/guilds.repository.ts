import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Guild, type GuildModel } from './schemas';
import { type RESTPostAPIGuildJSONBody } from '@workspace/types';

export interface IGuildsRepository {
  findAll(): Promise<Guild[]>;
  findOneById(id: Types.ObjectId): Promise<Guild | null>;
  findByUid(uid: string): Promise<Guild | null>;
  create(data: RESTPostAPIGuildJSONBody): Promise<Guild>;
}

export class GuildsRepository implements IGuildsRepository {
  constructor(
    @InjectModel(Guild.name, 'discord')
    private guildModel: GuildModel,
  ) {}

  /**
   * Retrieves all guilds from the database.
   */
  findAll(): Promise<Guild[]> {
    return this.guildModel.find().exec();
  }

  /**
   * Retrieves a guild by their ID.
   * @param id - The ID of the guild to retrieve.
   */
  findOneById(id: Types.ObjectId): Promise<Guild | null> {
    return this.guildModel.findById(id);
  }

  /**
   * Finds a guild by its unique identifier (UID).
   * @param uid - The unique identifier of the guild.
   */
  findByUid(uid: string): Promise<Guild | null> {
    return this.guildModel.findOne({ uid });
  }

  /**
   * Creates a new user in the database.
   * @param data - The data to create the guild with.
   */
  create(data: RESTPostAPIGuildJSONBody): Promise<Guild> {
    return this.guildModel.create(data);
  }
}
