import { Catch, type ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { NecordArgumentsHost } from 'necord';
import { BaseInteraction, MessageFlags } from 'discord.js';
import type { LogFormat } from '@workspace/logger';
import { StructuredLogger } from 'utils/logger';

/**
 * Exception filter to handle Discord command execution errors.
 */
@Catch()
export class DiscordExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new StructuredLogger({
    name: DiscordExceptionFilter.name,
    level: 'warn',
    format: process.env.LOG_FORMAT as LogFormat,
  });

  async catch(exception: Error, host: ArgumentsHost) {
    const [interaction] = NecordArgumentsHost.create(host).getContext();

    this.logger.warn(exception.message);

    if (interaction && interaction instanceof BaseInteraction && interaction.isRepliable()) {
      return await interaction.reply({ content: exception.message, flags: MessageFlags.Ephemeral });
    }
  }
}
