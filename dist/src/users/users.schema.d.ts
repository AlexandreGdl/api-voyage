import { Document } from 'mongoose';
export declare class Users extends Document {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
}
export declare const UsersSchema: import("mongoose").Schema<any>;
