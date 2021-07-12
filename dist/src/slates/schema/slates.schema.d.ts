import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
export declare class Slates extends Document {
    donorId: ObjectId;
    recipientId: ObjectId;
    amount: number;
    completed: boolean;
    title: string;
    voyageId: ObjectId;
    date: Date;
}
export declare const SlatesSchema: import("mongoose").Schema<any>;
