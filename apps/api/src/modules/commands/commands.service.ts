import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { type ICommand, type APICommand } from '@workspace/types';
import { GuildsService } from '../guilds';
import { Command } from './schemas';
import { CommandsRepository } from './commands.repository';

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
    const { _id, createdAt, updatedAt, ...rest } = command.toObject() as ICommand;
    const { guilds } = await command.populate('guilds');

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
