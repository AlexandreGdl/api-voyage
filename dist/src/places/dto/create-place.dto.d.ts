import { ObjectId } from 'mongodb';
import { Location } from '../interface/location.interface';
export declare class CreatePlaceDto {
    typeId: ObjectId;
    voyageId?: ObjectId;
    position: Location;
    name: string;
    isGlobal?: boolean;
    readonly admin_secret_key?: string;
}
