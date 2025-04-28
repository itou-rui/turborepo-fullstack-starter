import { Injectable } from '@nestjs/common';
import { DISCORD_API_ENDPOINT } from '@workspace/constants';
import { type DiscordAPIGuild } from '@workspace/types';
import { DiscordService } from './discord.service';

@Injectable()
export class DiscordGuildsService {
  constructor(private readonly discordService: DiscordService) {}

  async fetchGuild(guildId: string): Promise<DiscordAPIGuild> {
    return this.discordService.get<DiscordAPIGuild>(`${DISCORD_API_ENDPOINT}/guilds/${guildId}`);
  }
}
