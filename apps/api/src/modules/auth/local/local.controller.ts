import { Controller, Post, Body, Get, Req, Res } from '@nestjs/common';
import { Response, type Request } from 'express';
import { type APISession } from '@workspace/types';
import { UserNotFoundException } from 'utils/exceptions';
import { LoginLocalDto, RegisterLocalUserDto } from './dtos';
import { LocalAuthService } from './local.service';

@Controller('auth')
export class LocalAuthController {
  constructor(private readonly localAuthService: LocalAuthService) {}

  @Post('register')
  async register(@Body() data: RegisterLocalUserDto, @Res({ passthrough: true }) response: Response): Promise<APISession> {
    const user = await this.localAuthService.register(data);
    const session = await this.localAuthService.login(user);

    response.cookie('session_token', session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 3600 * 1000,
    });

    return this.localAuthService.toAPISession(session);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginLocalDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.localAuthService.validateUser(loginUserDto.email, loginUserDto.password);
    if (user === null) {
      throw new UserNotFoundException('Email address or password is incorrect.');
    }
    const session = await this.localAuthService.login(user);

    response.cookie('session_token', session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 3600 * 1000,
    });

    return this.localAuthService.toAPISession(session);
  }

  @Get('session')
  async getSession(@Req() request: Request): Promise<APISession | null> {
    const accessToken = request.cookies['session_token'];
    if (!accessToken) return null;

    const session = await this.localAuthService.validateSession(accessToken as string);
    if (session === null) return null;

    return this.localAuthService.toAPISession(session);
  }
}
