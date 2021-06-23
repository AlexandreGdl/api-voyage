import {
    Body,
    Controller, Get, NotFoundException, Post, Put, UnauthorizedException, UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '../config/config.service';
import { AuthGuard } from '@nestjs/passport';
import {Voyages} from "./schema/voyages.schema";
import {VoyagesService} from "./voyages.service";
import {AuthUser} from "../security/decorator/auth-user.decorator";
import {Users} from "../users/users.schema";
import {CreateVoyageDto} from "./dto/create-voyage.dto";
import {AddMemberDto} from "./dto/add-member.dto";
import {ToggleWidgetDto} from "./dto/toggle-widget.dto";

@Controller('/voyages')
@ApiTags('✈️ Voyages')
export class VoyagesController {

    private readonly bcryptSalt: number;

    constructor(
        private readonly voyagesService: VoyagesService,
        protected readonly env: ConfigService,
    ) {
        this.bcryptSalt = Number(this.env.get('bcrypt_salt'));
    }

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async getVoyages(@AuthUser() user: Users): Promise<Voyages[]> {
        return this.voyagesService.getUsersVoyage(user._id)
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    async createVoyage(@AuthUser() user: Users,@Body() newVoyages: CreateVoyageDto): Promise<Voyages> {
        return this.voyagesService.createVoyage(newVoyages, user._id);
    }

    @Put('/add-members')
    @UseGuards(AuthGuard('jwt'))
    async addMember(@AuthUser() user: Users,@Body() addMember: AddMemberDto): Promise<Voyages> {
        const voyage = await this.voyagesService.findVoyage(addMember.voyageId);
        console.log('toto')
        // TODO: Check if user exist
        if (!voyage) throw new NotFoundException('Voyage not found');
        
        if (voyage.ownerId.toString() !== user._id.toString()) throw new UnauthorizedException('You are not the owner');
        return this.voyagesService.addMember(addMember);
    }

    @Put('/widgets')
    @UseGuards(AuthGuard('jwt'))
    async toggleWidget(@AuthUser() user: Users,@Body() body: ToggleWidgetDto): Promise<Voyages> {
        return this.voyagesService.toggleWidget(body);
    }

}
