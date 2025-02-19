import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG_DATABASE, DatabaseConfig, databaseConfig } from 'config/database.config';
import { validationSchemaForEnv } from 'config/env-varidation';
import { UsersModule } from 'modules/users';
import { AuthModule } from 'modules/auth';
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
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<DatabaseConfig>(CONFIG_DATABASE)!.main.uri,
        ...configService.get<DatabaseConfig>(CONFIG_DATABASE)!.main.options,
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
