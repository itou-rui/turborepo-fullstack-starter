import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { type APICommand } from '@workspace/types';
import { type Command } from '../schemas';
import { CommandsRepository } from '../repositories';
import { GuildsService } from './guilds.service';

@Injectable()
export class CommandsService {
  constructor(
    private readonly guildsService: GuildsService,
    private readonly commandsRepository: CommandsRepository,
  ) {}

  /**
   * Converts a Command object to an APICommand object.
   * @param {Command} command - The command object to convert.
   */
  async toAPICommnad(command: Command): Promise<APICommand> {
    const { _id, createdAt, updatedAt, guilds, ...rest } = command.toObject() as Command;
    return {
      ...rest,
      _id: _id.toString(),
      guilds: guilds.map((guild) => this.guildsService.toAPIGuild(guild)),
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  }

  /**
   * Retrieves all guilds from the database.
   */
  findAll(): Promise<Command[]> {
    return this.commandsRepository.findAll();
  }

  /**
   * Finds all active commands.
   */
  findActiveCommands(): Promise<Command[]> {
    return this.commandsRepository.findAll({ active: true });
  }

  /**
   * Retrieves a guild by their ID.
   * @param id - The ID of the guild to retrieve.
   */
  findOneById(id: string): Promise<Command | null> {
    const _id = new Types.ObjectId(id);
    return this.commandsRepository.findOneByObjectId(_id);
  }

  /**
   * Finds a guild by its unique identifier (UID).
   * @param uid - The unique identifier of the guild.
   */
  findByUid(uid: string): Promise<Command | null> {
    return this.commandsRepository.findByUid(uid);
  }
}
