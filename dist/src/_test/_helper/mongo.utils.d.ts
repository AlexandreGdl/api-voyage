import { MongoClient, Db } from 'mongodb';
import { Document } from 'mongoose';
export interface IMongoConnection {
    db: Db;
    connection: MongoClient;
}
export declare const getMongoConnection: () => Promise<{
    db: Db;
    connection: MongoClient;
}>;
export declare const cleanObjectIds: (object: Document | Document[]) => Document | Document[];
export declare const cleanDatabase: (db: Db) => Promise<void>;
