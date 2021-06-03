import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Location } from '../interface/location.interface';

export class CreatePlaceDto {
    @IsMongoId()
    @IsNotEmpty()
    typeId: ObjectId;

    @IsMongoId()
    @IsNotEmpty()
    voyageId: ObjectId;

    @IsNotEmpty()
    position: Location;

    @IsString()
    @IsNotEmpty()
    name: string;
}
