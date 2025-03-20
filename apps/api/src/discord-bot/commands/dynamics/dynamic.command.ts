import { Injectable, UseFilters } from '@nestjs/common';
import { MessageFlags } from 'discord.js';
import { Ctx, SlashCommand, SlashCommandContext } from 'necord';
import { DiscordExceptionFilter } from 'utils/filters';

@Injectable()
@UseFilters(DiscordExceptionFilter)
export class DynamicCommand {
  @SlashCommand({
    name: 'dynamic',
    description: 'This is a dynamic command',
  })
  async run(@Ctx() [i]: SlashCommandContext) {
    return i.reply({ content: 'I am so dynamic !! 😎', flags: MessageFlags.Ephemeral });
  }
}
