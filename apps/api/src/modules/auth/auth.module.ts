import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { type EnvironmentVariables } from 'config/env-varidation';
import { UsersModule } from '../users';
import { LocalAuthService, LocalAuthController, LocalStrategy, LocalAuthRepository } from './local';

@Module({
  imports: [
    UsersModule,
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
  controllers: [LocalAuthController],
  providers: [LocalAuthService, LocalStrategy, LocalAuthRepository],
  exports: [LocalAuthService],
})
export class AuthModule {}
