import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuildsModule } from '../guilds';
import { Command, CommandSchema } from './schemas';
import { CommandsService } from './commands.service';
import { CommandsRepository } from './commands.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Command.name, schema: CommandSchema }], 'discord'), GuildsModule],
  providers: [CommandsService, CommandsRepository],
  exports: [CommandsService],
})
export class CommandsModule {}
