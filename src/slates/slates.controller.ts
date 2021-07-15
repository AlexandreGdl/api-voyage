import {
  Body,
  Controller, Get, NotFoundException, Post, UnauthorizedException, UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '../config/config.service';
import { AuthGuard } from '@nestjs/passport';
import { Slates } from './schema/slates.schema';
import { AuthUser } from '../security/decorator/auth-user.decorator';
import { CreateSlateDto } from './dto/create-slate.dto';
import { Users } from '../users/users.schema';
import {SlatesService} from "./slates.service";

@Controller('/slates')
@ApiTags('📝 Slates')
export class SlatesController {

  private readonly bcryptSalt: number;

  constructor(
    protected readonly env: ConfigService,
    private readonly slatesService: SlatesService,
  ) {
    this.bcryptSalt = Number(this.env.get('bcrypt_salt'));
  }

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  async createSlates(@AuthUser() user: Users, @Body() newSlates: CreateSlateDto): Promise<Slates | Slates[]> {
    return this.slatesService.createSlates(newSlates);
  }
}
