import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthJwtService } from '../services/jwt.service';
import { UsersService, CreateUserDto } from '../../users';
import { LoginUserDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authJwtService: AuthJwtService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await this.authJwtService.hashPassword(createUserDto.password);
    const user = await this.usersService.create({ ...createUserDto, password: hashedPassword });
    return this.authJwtService.login(user);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authJwtService.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authJwtService.login(user);
  }
}
