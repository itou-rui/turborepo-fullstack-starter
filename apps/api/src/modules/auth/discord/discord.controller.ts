import { type Request } from 'express';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard, DiscordAuthGuard } from './discord.guards';

@Controller('auth')
export class DiscordAuthController {
  @Get('discord/callback')
  @UseGuards(DiscordAuthGuard)
  callback() {
    return { msg: 'Redirect' };
  }

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return { msg: 'Login' };
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  logout() {
    return {};
  }
}
