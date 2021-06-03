import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateNotesDto {
    @IsNotEmpty()
    @IsMongoId()
    voyageId: ObjectId;

    @IsString()
    @IsNotEmpty()
    name: string;
}
