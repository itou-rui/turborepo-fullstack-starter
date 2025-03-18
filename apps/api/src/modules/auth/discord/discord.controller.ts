import { Response, type Request } from 'express';
import { Controller, Get, Post, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { type Profile as DiscordProfile } from 'passport-discord';
import { HttpExceptionFilter } from 'utils/filters';
import { DiscordAuthenticatedGuard, DiscordAuthGuard } from './discord.guards';

@UseFilters(HttpExceptionFilter)
@Controller('auth/discord')
export class DiscordAuthController {
  constructor() {}

  @Get('callback')
  @UseGuards(DiscordAuthGuard)
  callback(@Res() response: Response) {
    response.redirect('/auth/signin');
  }

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {}

  @Get('me')
  @UseGuards(DiscordAuthenticatedGuard)
  me(@Req() request: Request): DiscordProfile | null {
    return request.user as DiscordProfile;
  }

  @Post('logout')
  logout(@Req() request: Request): void {
    request.session.destroy(() => {});
  }
}
