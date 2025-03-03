import { Controller, Post, Body, UnauthorizedException, Get, Req, Res } from '@nestjs/common';
import { Response, type Request } from 'express';
import { type APISession } from '@workspace/types';
import { SessionService } from 'modules/session';
import { LocalAuthService } from '../services/local.service';
import { LoginLocalDto, RegisterLocalUserDto } from '../dto';

@Controller('auth')
export class LocalAuthController {
  constructor(
    private readonly authJwtService: LocalAuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Post('register')
  async register(@Body() data: RegisterLocalUserDto, @Res({ passthrough: true }) response: Response): Promise<APISession> {
    const user = await this.authJwtService.register(data);
    const session = await this.authJwtService.login(user);

    response.cookie('session-token', session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
      maxAge: 3600 * 1000,
    });

    return this.sessionService.toAPISession(session);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginLocalDto, @Res({ passthrough: true }) response: Response) {
    const user = await this.authJwtService.validateUser(loginUserDto.email, loginUserDto.password);
    if (user === null) {
      throw new UnauthorizedException();
    }
    const session = await this.authJwtService.login(user);

    response.cookie('session-token', session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
      maxAge: 3600 * 1000,
    });

    return this.sessionService.toAPISession(session);
  }

  @Get('session')
  async getSession(@Req() request: Request): Promise<APISession | null> {
    const accessToken = request.cookies['session-token'];
    if (!accessToken) return null;

    const session = await this.sessionService.validateSession(accessToken as string);
    if (session === null) return null;

    return this.sessionService.toAPISession(session);
  }
}
