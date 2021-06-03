import {IsDateString, IsMongoId, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Location} from "../interface/location.interface";

export class CreateVoyageDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    defaultName: string;

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ required: true })
    startDate: Date;

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ required: true })
    endDate: Date;


    @IsNotEmpty()
    @ApiProperty({ required: true })
    cityName: string;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    location: Location;
}
