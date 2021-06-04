import {
    Body,
    Controller, Get, Post, UnauthorizedException, UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '../config/config.service';
import { AuthGuard } from '@nestjs/passport';
import {TypesService} from "./types.service";
import {Types} from "./types.schema";
import {AuthUser} from "../security/decorator/auth-user.decorator";
import {Users} from "../users/users.schema";
import {CreateTypesDto} from "./dto/create-types.dto";

@Controller('/types')
@ApiTags('🔖 Types')
export class TypesController {

    constructor(
        protected readonly typesService: TypesService,
        protected readonly env: ConfigService,
    ) {
    }

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async getTypes(): Promise<Types[]> {
        return this.typesService.getAllTypes();
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    async createType(@AuthUser() user: Users, @Body() body: CreateTypesDto): Promise<Types> {
        if (!body.admin_secret_key) throw new UnauthorizedException('Bad request');
        if (body.admin_secret_key && body.admin_secret_key !== this.env.get('admin_secret_key')) throw new UnauthorizedException('Bad request');
        return this.typesService.createType(body.name);
    }

}
