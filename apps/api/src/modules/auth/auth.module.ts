import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'modules/users';
import { AuthController } from './controllers/jwt.controller';
import { AuthJwtService } from './services/jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { type EnvironmentVariables } from 'config/env-varidation';

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
  controllers: [AuthController],
  providers: [AuthJwtService, JwtStrategy],
  exports: [AuthJwtService],
})
export class AuthModule {}
