import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GuildsController } from './controllers';
import { Guild, GuildSchema, Command, CommandSchema } from './schemas';
import { GuildsService, CommandsService } from './services';
import { GuildsRepository, CommandsRepository } from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }], 'discord'),
    MongooseModule.forFeature([{ name: Command.name, schema: CommandSchema }], 'discord'),
  ],
  providers: [GuildsService, GuildsRepository, CommandsService, CommandsRepository],
  controllers: [GuildsController],
  exports: [GuildsService, CommandsService],
})
export class GuildsModule {}
