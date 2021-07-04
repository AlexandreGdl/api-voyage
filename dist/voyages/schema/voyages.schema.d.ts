import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Location } from '../interface/location.interface';
export declare class Voyages extends Document {
    ownerId: ObjectId;
    memberIds?: ObjectId[];
    name: string;
    selectedWidgets?: ObjectId[];
    defaultName: string;
    startDate: Date;
    endDate: Date;
    cityName: string;
    location: Location;
}
export declare const VoyagesSchema: import("mongoose").Schema<any>;
