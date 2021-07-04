import {IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateSlateDto {
  @IsMongoId()
  @IsOptional()
  donorId?: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  recipientId: ObjectId;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsMongoId()
  @IsNotEmpty()
  voyageId: ObjectId;

 @IsOptional()
 @IsArray()
 multipleDonorIds?: ObjectId[];
}