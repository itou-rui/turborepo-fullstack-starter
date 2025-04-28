import { Controller, Get, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { type DiscordAPIGuild } from '@workspace/types';
import { HttpResponseInterceptor } from 'utils/interceptors';
import { HttpExceptionFilter } from 'utils/filters';
import { DiscordGuildsService } from '../services';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(HttpResponseInterceptor)
@Controller('external/discord/guilds')
export class DiscordGuildsController {
  constructor(private readonly discordGuildsService: DiscordGuildsService) {}

  @Get(':guildId')
  async getGuild(@Param('guildId') guildId: string): Promise<DiscordAPIGuild> {
    return this.discordGuildsService.fetchGuild(guildId);
  }
}
