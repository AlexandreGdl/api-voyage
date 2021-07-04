import { MongoClient, Db } from 'mongodb';
export interface IMongoConnection {
    db: Db;
    connection: MongoClient;
}
