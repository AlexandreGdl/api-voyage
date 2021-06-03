import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    readonly username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    readonly phoneNumber: string;
}
