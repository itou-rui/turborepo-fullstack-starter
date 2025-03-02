import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Guild, GuildSchema } from 'database/discord';
import * as Services from './services';
import * as Controllers from './controllers';

const services = Object.values(Services).flat();
const controllers = Object.values(Controllers).flat();

@Module({
  imports: [MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }], 'discord')],
  providers: [...services],
  controllers: [...controllers],
  exports: [...services],
})
export class GuildsModule {}
