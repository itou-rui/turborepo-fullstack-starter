import { Injectable, UseFilters } from '@nestjs/common';
import { MessageFlags } from 'discord.js';
import { Ctx, SlashCommand, SlashCommandContext } from 'necord';
import { DiscordExceptionFilter } from 'utils/filters';

@Injectable()
@UseFilters(DiscordExceptionFilter)
export class PublicCommand {
  @SlashCommand({ name: 'ping', description: 'Bot status' })
  async run(@Ctx() [i]: SlashCommandContext) {
    return i.reply({ content: 'Pong !', flags: MessageFlags.Ephemeral });
  }
}
