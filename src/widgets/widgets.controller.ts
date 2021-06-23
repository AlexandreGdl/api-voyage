import {
  Body,
  Controller, Get, NotFoundException, Post, UnauthorizedException, UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '../config/config.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/security/decorator/auth-user.decorator';
import { Users } from 'src/users/users.schema';
import {Widgets} from "./schema/widgets.schema";
import {WidgetService} from "./widgets.service";

@Controller('/widgets')
@ApiTags('📝 Widgets')
export class WidgetsController {

  private readonly bcryptSalt: number;

  constructor(
    protected readonly env: ConfigService,
    private readonly widgetService: WidgetService,
  ) {
    this.bcryptSalt = Number(this.env.get('bcrypt_salt'));
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async getWidgets(): Promise<Widgets[]> {
    return this.widgetService.getWidgets();
  }
}
