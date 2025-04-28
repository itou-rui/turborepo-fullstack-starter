import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IGuildModel, type APIGuild, type RESTPostAPIGuildJSON } from '@workspace/types';
import { Guild } from '../schemas';
import { GuildsRepository } from '../repositories';

@Injectable()
export class GuildsService {
  constructor(private guildRepository: GuildsRepository) {}

  /**
   * Converts a Guild instance to an APIGuild object.
   * @param guild - The Guild instance to convert.
   * @returns The converted APIGuild object.
   */
  toAPIGuild(guild: Guild): APIGuild {
    const { _id, createdAt, updatedAt, ...rest } = guild.toObject() as IGuildModel;
    return {
      ...rest,
      _id: _id.toString(),
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  }

  /**
   * Retrieves all guilds from the database.
   */
  findAll(): Promise<Guild[]> {
    return this.guildRepository.findAll();
  }

  /**
   * Retrieves a guild by their ID.
   * @param id - The ID of the guild to retrieve.
   */
  findOneById(id: string): Promise<Guild | null> {
    const _id = new Types.ObjectId(id);
    return this.guildRepository.findOneById(_id);
  }

  /**
   * Finds a guild by its unique identifier (UID).
   * @param uid - The unique identifier of the guild.
   */
  findByUid(uid: string): Promise<Guild | null> {
    return this.guildRepository.findByUid(uid);
  }

  /**
   * Creates a new user in the database.
   * @param data - The data to create the guild with.
   */
  create(data: RESTPostAPIGuildJSON): Promise<Guild> {
    return this.guildRepository.create(data);
  }
}
