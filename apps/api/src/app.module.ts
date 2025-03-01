import { type Connection } from 'mongoose';
import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG_DATABASE, DatabaseConfig, databaseConfig } from 'config/database.config';
import { validationSchemaForEnv } from 'config/env-varidation';
import { UsersModule } from './modules/users';
import { AuthModule } from './modules/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
      validationSchema: validationSchemaForEnv,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'main',
      useFactory: async (configService: ConfigService) => {
        const baseConfig = configService.get<DatabaseConfig>(CONFIG_DATABASE)!.main;
        const logger = new Logger(AppModule.name);
        const formatMesssge = (operation: string) => `${operation} to main database (${baseConfig.connectionName})`;
        return {
          uri: baseConfig.uri,
          ...baseConfig.options,
          onConnectionCreate: (connection: Connection) => {
            connection.on('connected', () => logger.log(formatMesssge('Connected')));
            connection.on('open', () => logger.log(formatMesssge('Opened')));
            connection.on('disconnected', () => logger.warn(formatMesssge('Disconnected')));
            connection.on('reconnected', () => logger.log(formatMesssge('Reconnected')));
            connection.on('disconnecting', () => logger.warn(formatMesssge('Disconnecting')));
            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'discord',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<DatabaseConfig>(CONFIG_DATABASE)!.discord.uri,
        ...configService.get<DatabaseConfig>(CONFIG_DATABASE)!.discord.options,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
