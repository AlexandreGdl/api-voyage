import {
  Body,
  Controller, Get, NotFoundException, Post, UnauthorizedException, UseGuards,
} from '@nestjs/common';
  
  import { ApiTags } from '@nestjs/swagger';
  import { ConfigService } from '../config/config.service';
  import { AuthGuard } from '@nestjs/passport';
import { Places } from './schema/places.schema';
import { AuthUser } from 'src/security/decorator/auth-user.decorator';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Users } from 'src/users/users.schema';
import { PlacesService } from './places.services';

  @Controller('/places')
  @ApiTags('‍📍 Places')
  export class PlacesController {
  
    private readonly bcryptSalt: number;
  
    constructor(
      protected readonly env: ConfigService,
      private readonly placesService: PlacesService,
    ) {
      this.bcryptSalt = Number(this.env.get('bcrypt_salt'));
    }

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async getPlaces(): Promise<Places[]> {
      return this.placesService.getGlobalPlaces();
    }
    
    @Post('')
    @UseGuards(AuthGuard('jwt'))
    async createPlaces(@AuthUser() user: Users, @Body() newPlaces: CreatePlaceDto): Promise<Places> {
      if (newPlaces.isGlobal || !newPlaces.voyageId) {
        if (!newPlaces.admin_secret_key) throw new UnauthorizedException('Bad request');
        if (newPlaces.admin_secret_key && newPlaces.admin_secret_key !== this.env.get('admin_secret_key')) throw new UnauthorizedException('Bad request');
      }
      return this.placesService.createPlaces(newPlaces);
    }
  }
  