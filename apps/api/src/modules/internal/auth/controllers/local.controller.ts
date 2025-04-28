import { Controller, Post, Body, Get, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { type Request } from 'express';
import { ProviderType } from '@workspace/constants';
import { LocalAuthProfile } from '@workspace/types';
import { HttpExceptionFilter } from 'utils/filters';
import { HttpResponseInterceptor } from 'utils/interceptors';
import { LoginLocalDto, RegisterLocalUserDto } from '../dtos';
import { LocalAuthenticatedGuard, LocalAuthGuard } from '../guards';
import { LocalAuthService } from '../services';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(HttpResponseInterceptor)
@Controller('internal/auth/local')
export class LocalAuthController {
  constructor(private readonly localAuthService: LocalAuthService) {}

  @Post('register')
  async register(@Body() data: RegisterLocalUserDto): Promise<LocalAuthProfile> {
    const user = await this.localAuthService.createUser(data.username, data.email, data.password);
    return { uid: user.uid, email: data.email, username: data.username, provider: ProviderType.Local };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: Request, @Body() _data: LoginLocalDto): Promise<LocalAuthProfile> {
    return request.user as LocalAuthProfile;
  }

  @Get('me')
  @UseGuards(LocalAuthenticatedGuard)
  async me(@Req() request: Request): Promise<LocalAuthProfile | null> {
    return request.user as LocalAuthProfile;
  }

  @Post('logout')
  async logout(@Req() request: Request): Promise<void> {
    request.session.destroy(() => {});
  }
}
