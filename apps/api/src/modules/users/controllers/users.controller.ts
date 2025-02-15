import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { type RESTGetAPIUserResult, type RESTPostAPIUserResult } from '@workspace/types';
import { UsersService } from '../services';
import { CreateUserDto } from '../dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<RESTGetAPIUserResult[]> {
    return await this.usersService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<RESTGetAPIUserResult | null> {
    return await this.usersService.findOneById(userId);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<RESTPostAPIUserResult> {
    return await this.usersService.create(createUserDto);
  }
}
