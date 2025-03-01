import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { EnvironmentVariables } from 'config/env-varidation';
import { User, UserSchema } from 'database/main';
import { Command, CommandSchema, Guild, GuildSchema } from 'database/discord';

@Module({
  imports: [
    /** Mongoose */
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'main'),
    MongooseModule.forFeature(
      [
        { name: Guild.name, schema: GuildSchema },
        { name: Command.name, schema: CommandSchema },
      ],
      'discord',
    ),

    /** DiscordBot */
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
  ],
})
export class DiscordModule {}
