import { ObjectId } from 'mongodb';
export declare class CreateSlateDto {
    donorId?: ObjectId;
    recipientId: ObjectId;
    amount: number;
    title: string;
    voyageId: ObjectId;
    multipleDonorIds?: ObjectId[];
}
