import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Guild, GuildSchema } from './schemas';
import { GuildsService } from './guilds.service';
import { GuildsRepository } from './guilds.repository';
import { GuildsController } from './guilds.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }], 'discord')],
  providers: [GuildsService, GuildsRepository],
  controllers: [GuildsController],
  exports: [GuildsService],
})
export class GuildsModule {}
