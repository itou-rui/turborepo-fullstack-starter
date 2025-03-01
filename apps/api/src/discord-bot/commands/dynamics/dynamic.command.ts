import { Injectable } from '@nestjs/common';
import { MessageFlags } from 'discord.js';
import { Ctx, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class DynamicCommand {
  @SlashCommand({
    name: 'dynamic',
    description: 'This is a dynamic command',
  })
  async run(@Ctx() [i]: SlashCommandContext) {
    return i.reply({ content: 'I am so dynamic !! 😎', flags: MessageFlags.Ephemeral });
  }
}
