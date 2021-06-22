import {IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ObjectId } from 'mongodb';
import { Location } from '../interface/location.interface';

export class CreatePlaceDto {
    @IsMongoId()
    @IsNotEmpty()
    typeId: ObjectId;

    @IsMongoId()
    @IsOptional()
    voyageId?: ObjectId;

    @IsNotEmpty()
    position: Location;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsBoolean()
    @IsOptional()
    isGlobal?: boolean;

    @IsOptional()
    readonly admin_secret_key?: string;
}
