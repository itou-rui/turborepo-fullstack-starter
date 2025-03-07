import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { Response, type Request } from 'express';
import { LocalAuthProfile, RESTGetAPISessionResult } from '@workspace/types';
import { LoginLocalDto, RegisterLocalUserDto } from './dtos';
import { LocalAuthService } from './local.service';

@Controller('auth')
export class LocalAuthController {
  constructor(private readonly localAuthService: LocalAuthService) {}

  @Post('register')
  async register(@Body() data: RegisterLocalUserDto, @Res({ passthrough: true }) response: Response) {
    const session = await this.localAuthService.register(data);

    response.cookie('session_token', session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 3600 * 1000,
    });

    return null;
  }

  @Post('login')
  async login(@Body() { email, password }: LoginLocalDto, @Res({ passthrough: true }) response: Response) {
    const session = await this.localAuthService.login(email, password);

    response.cookie('session_token', session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 3600 * 1000,
    });

    return null;
  }

  @Get('session')
  async getSession(@Req() request: Request): Promise<RESTGetAPISessionResult<LocalAuthProfile> | null> {
    const accessToken = request.cookies['session_token'];
    if (!accessToken) return null;

    const session = await this.localAuthService.getSessionByToken(accessToken as string);
    if (session === null) return null;

    const { _id, index, createdAt, updatedAt, _version, ...rest } = this.localAuthService.toAPISession(session);
    const profile = this.localAuthService.getProfileFromToken(accessToken as string);

    return { ...rest, profile };
  }
}
