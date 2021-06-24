import {
  Body,
  Controller, Get, NotFoundException, Param, Post, UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('/users')
@ApiTags('👨🏻‍💻 Users')
export class UsersController {

  private readonly bcryptSalt: number;

  constructor(
    protected readonly userService: UsersService,
    protected readonly authService: AuthService,
    protected readonly env: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.bcryptSalt = Number(this.env.get('bcrypt_salt'));
  }

  @Post('/login')
  async login(@Body() body: { email: string, password: string }): Promise<{ token: string }> {
    const user = await this.userService.login(body);
    if (!user) throw new NotFoundException('User not found');
    const jwt = await this.jwtService.sign(user.toJSON(), { expiresIn: '30d' });
    return { token: `Bearer ${jwt}` };
  }

  @Post('/signup')
  async signup(@Body() newUser: CreateUserDto): Promise<{ token: string }> {
    const user = await this.userService.signUp(newUser);
    const jwt = await this.jwtService.sign(user.toJSON(), { expiresIn: '30d' });
    return { token: `Bearer ${jwt}` };
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('id') id) {
    return this.userService.getUserWithId(id);;
  }
}
