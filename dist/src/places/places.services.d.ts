import { Model } from 'mongoose';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Places } from './schema/places.schema';
export declare class PlacesService {
    private placesModel;
    constructor(placesModel: Model<Places>);
    getGlobalPlaces(): Promise<Places[]>;
    createPlaces(newPlaces: CreatePlaceDto): Promise<Places>;
}
