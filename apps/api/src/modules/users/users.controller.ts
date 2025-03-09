import { Controller, Get, Param } from '@nestjs/common';
import { type APIUser } from '@workspace/types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<APIUser[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => this.usersService.toAPIUser(user));
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<APIUser | null> {
    const user = await this.usersService.findOneById(userId);
    return user ? this.usersService.toAPIUser(user) : null;
  }
}
