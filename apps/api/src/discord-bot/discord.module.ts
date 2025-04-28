import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { EnvironmentVariables } from 'config/env-varidation';
import { UsersModule } from 'modules/users';
import { GuildsModule } from 'modules/guilds';
import { CommandsModule } from 'modules/commands';
import * as Events from './events';
import * as PublicCommands from './commands/publics';
import * as DynamicCommands from './commands/dynamics';
import * as Services from './services';

@Module({
  imports: [
    NecordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<EnvironmentVariables>) => ({
        token: configService.get('DISCORD_BOT_TOKEN')!,
        intents: [
          IntentsBitField.Flags.Guilds,
          IntentsBitField.Flags.GuildMessages,
          IntentsBitField.Flags.MessageContent,
          IntentsBitField.Flags.DirectMessages,
        ],
        skipRegistration: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    GuildsModule,
    CommandsModule,
  ],
  providers: [Services, PublicCommands, DynamicCommands, Events].map((e) => Object.values(e)).flat(),
})
export class DiscordModule {}
