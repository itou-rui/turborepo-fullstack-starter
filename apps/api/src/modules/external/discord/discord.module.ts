import { Module } from '@nestjs/common';
import { DiscordGuildsController } from './controllers';
import { DiscordService, DiscordGuildsService, DiscordGuildMembersService } from './services';

@Module({
  providers: [DiscordService, DiscordGuildsService, DiscordGuildMembersService],
  controllers: [DiscordGuildsController],
  exports: [DiscordService, DiscordGuildsService, DiscordGuildMembersService],
})
export class DiscordModule {}
