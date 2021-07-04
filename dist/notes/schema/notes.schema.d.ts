import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
export declare class Notes extends Document {
    content: string;
    voyageId: ObjectId;
    name: string;
}
export declare const NotesSchema: import("mongoose").Schema<any>;
