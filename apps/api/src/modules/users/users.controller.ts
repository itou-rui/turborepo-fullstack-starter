import { Controller, Get, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { type APIUser } from '@workspace/types';
import { HttpExceptionFilter } from 'utils/filters';
import { UsersService } from './users.service';
import { HttpResponseInterceptor } from 'utils/interceptors';
import { UserNotFoundException } from 'utils/exceptions';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(HttpResponseInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<APIUser[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => this.usersService.toAPIUser(user));
  }

  @Get(':uid')
  async findOne(@Param('uid') uid: string): Promise<APIUser | null> {
    const user = await this.usersService.findOneByUid(uid);
    if (!user) throw new UserNotFoundException(uid);
    return this.usersService.toAPIUser(user);
  }
}
