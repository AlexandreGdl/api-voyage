import { ConfigService } from '../config/config.service';
import { Places } from './schema/places.schema';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Users } from 'src/users/users.schema';
import { PlacesService } from './places.services';
export declare class PlacesController {
    protected readonly env: ConfigService;
    private readonly placesService;
    private readonly bcryptSalt;
    constructor(env: ConfigService, placesService: PlacesService);
    getPlaces(): Promise<boolean>;
    createPlaces(user: Users, newPlaces: CreatePlaceDto): Promise<Places>;
}
