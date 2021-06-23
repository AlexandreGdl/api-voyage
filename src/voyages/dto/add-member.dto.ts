import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMemberDto {
    @IsString()
    @ApiProperty({ required: true })
    readonly voyageId: string;

    @IsString()
    @ApiProperty({ required: true })
    readonly username: string;
}
