import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { type EnvironmentVariables } from 'config/env-varidation';
import { UsersModule } from 'modules/users';
import { SessionModule } from 'modules/session';
import * as Controllers from './controllers';
import * as Services from './services';
import * as Strategies from './strategies';

const services = Object.values(Services).flat();
const controllers = Object.values(Controllers).flat();
const strategies = Object.values(Strategies).flat();

@Module({
  imports: [
    UsersModule,
    SessionModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<EnvironmentVariables>) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [...controllers],
  providers: [...services, ...strategies],
  exports: [...services],
})
export class AuthModule {}
