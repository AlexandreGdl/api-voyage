import {
  Body,
  Controller, Get, Post, UseGuards,
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

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getUser(): Promise<boolean> {
    return true;
  }

  @Post('/login')
  async login(@Body() body: { email: string, password: string }): Promise<{ token: string }> {
    const user = await this.userService.login(body);
    const jwt = await this.jwtService.sign(user.toJSON(), { expiresIn: '30d' });
    return { token: `Bearer ${jwt}` };
  }

  @Post('/signup')
  async signup(@Body() newUser: CreateUserDto): Promise<{ token: string }> {
    const user = await this.userService.signUp(newUser);
    const jwt = await this.jwtService.sign(user.toJSON(), { expiresIn: '30d' });
    return { token: `Bearer ${jwt}` };
  }


}
