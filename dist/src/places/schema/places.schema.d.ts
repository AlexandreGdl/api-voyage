import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Location } from '../interface/location.interface';
export declare class Places extends Document {
    typeId: ObjectId;
    voyageId?: ObjectId;
    position: Location;
    name: string;
    mediaId?: ObjectId;
    isGlobal?: boolean;
}
export declare const PlacesSchema: import("mongoose").Schema<any>;
