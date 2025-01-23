import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG_DATABASE, databaseConfig } from './config/database.config';
import { validationSchemaForEnv } from './config/env-varidation';
import { UsersModule } from './modules';
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
        uri: configService.get(CONFIG_DATABASE).main.uri,
        ...configService.get(CONFIG_DATABASE).main.options,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
