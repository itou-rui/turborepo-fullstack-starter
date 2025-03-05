import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { type APICommand } from '@workspace/types';
import { Command } from './schemas';
import { CommandsRepository } from './commands.repository';

@Injectable()
export class CommandsService {
  constructor(private commandsRepository: CommandsRepository) {}

  /**
   * Converts a Guild instance to an APIGuild object.
   * @param guild - The Guild instance to convert.
   * @returns The converted APIGuild object.
   */
  toAPIGuild(guild: Command): APICommand {
    return guild.toObject();
  }

  /**
   * Retrieves all guilds from the database.
   */
  findAll(): Promise<Command[]> {
    return this.commandsRepository.findAll();
  }

  findActiveCommands(): Promise<Command[]> {
    return this.commandsRepository.findAll({ active: true });
  }

  /**
   * Retrieves a guild by their ID.
   * @param id - The ID of the guild to retrieve.
   */
  findOneById(id: string): Promise<Command | null> {
    const _id = new Types.ObjectId(id);
    return this.commandsRepository.findOneById(_id);
  }

  /**
   * Finds a guild by its unique identifier (UID).
   * @param uid - The unique identifier of the guild.
   */
  findByUid(uid: string): Promise<Command | null> {
    return this.commandsRepository.findByUid(uid);
  }
}
