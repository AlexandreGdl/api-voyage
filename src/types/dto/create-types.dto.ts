import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateTypesDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    readonly name: string;

    @IsOptional()
    readonly secret_admin_key?: string;
}