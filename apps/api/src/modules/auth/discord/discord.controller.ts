import { Response, type Request } from 'express';
import { Controller, Get, InternalServerErrorException, Post, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { type Profile as DiscordProfile } from 'passport-discord';
import { APISession } from '@workspace/types';
import { HttpExceptionFilter } from 'utils/filters';
import { AuthenticatedGuard, DiscordAuthGuard } from './discord.guards';
import { DiscordAuthService } from './discord.service';

@UseFilters(HttpExceptionFilter)
@Controller('auth/discord')
export class DiscordAuthController {
  constructor(private readonly discordAuthService: DiscordAuthService) {}

  @Get('callback')
  @UseGuards(DiscordAuthGuard)
  callback(@Res() response: Response) {
    return response.redirect('/auth/signin');
  }

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return { msg: 'Login' };
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  async status(@Req() request: Request): Promise<APISession<DiscordProfile> | null> {
    const profile = request.user as DiscordProfile & { accessToken: string };
    const session = await this.discordAuthService.findSessionByAccessToken(profile.accessToken);
    if (session === null) {
      throw new InternalServerErrorException('Session not found');
    }
    return this.discordAuthService.toAPISession(session!);
  }

  @Post('logout')
  logout(@Req() request: Request) {
    request.session.destroy((error) => {
      console.log(error);
    });
  }
}
