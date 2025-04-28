import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Command, type CommandModel } from '../schemas';
import type { ICommandModel } from '@workspace/types';

export interface ICommandsRepository {
  findAll(filter: Partial<ICommandModel>): Promise<Command[]>;
  findOneByObjectId(id: Types.ObjectId): Promise<Command | null>;
  findByUid(uid: string): Promise<Command | null>;
}

export class CommandsRepository implements ICommandsRepository {
  private populateFields = 'guilds';

  constructor(
    @InjectModel(Command.name, 'discord')
    private commandModel: CommandModel,
  ) {}

  /**
   * Retrieves all guilds from the database.
   */
  findAll(filter: Partial<ICommandModel> = {}): Promise<Command[]> {
    return this.commandModel.find(filter).populate(this.populateFields).exec();
  }

  /**
   * Retrieves a guild by their ID.
   * @param id - The ID of the guild to retrieve.
   */
  findOneByObjectId(id: Types.ObjectId): Promise<Command | null> {
    return this.commandModel.findById(id).populate(this.populateFields).exec();
  }

  /**
   * Finds a guild by its unique identifier (UID).
   * @param uid - The unique identifier of the guild.
   */
  findByUid(uid: string): Promise<Command | null> {
    return this.commandModel.findOne({ uid }).populate(this.populateFields).exec();
  }
}
