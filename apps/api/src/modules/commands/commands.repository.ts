import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Command, type CommandModel } from './schemas';
import { ICommand } from '@workspace/types';

export interface ICommandsRepository {
  findAll(filter: Partial<ICommand>): Promise<Command[]>;
  findOneById(id: Types.ObjectId): Promise<Command | null>;
  findByUid(uid: string): Promise<Command | null>;
}

export class CommandsRepository implements ICommandsRepository {
  constructor(
    @InjectModel(Command.name, 'discord')
    private commandModel: CommandModel,
  ) {}

  /**
   * Retrieves all guilds from the database.
   */
  async findAll(filter: Partial<ICommand> = {}): Promise<Command[]> {
    return this.commandModel.find(filter).populate('guilds').exec();
  }

  /**
   * Retrieves a guild by their ID.
   * @param id - The ID of the guild to retrieve.
   */
  findOneById(id: Types.ObjectId): Promise<Command | null> {
    return this.commandModel.findById(id);
  }

  /**
   * Finds a guild by its unique identifier (UID).
   * @param uid - The unique identifier of the guild.
   */
  findByUid(uid: string): Promise<Command | null> {
    return this.commandModel.findOne({ uid });
  }
}
