import { Injectable } from '@nestjs/common';
import { DISCORD_API_ENDPOINT } from '@workspace/constants';
import type { DiscordAPIGuildMember } from '@workspace/types';
import { DiscordService } from './discord.service';

@Injectable()
export class DiscordGuildMembersService {
  constructor(private readonly discordService: DiscordService) {}

  me(guildId: string, accessToken: string): Promise<DiscordAPIGuildMember> {
    return this.discordService.get(`${DISCORD_API_ENDPOINT}/guilds/${guildId}members/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
