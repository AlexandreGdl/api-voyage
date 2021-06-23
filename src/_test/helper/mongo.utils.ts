import { MongoClient, Db } from 'mongodb';

/**
 * This file group all functions used commonly in the test files
 */

/**
 * @interface IMongoConnection
 * Store the connection and the db reference on a mongo connection.
 */
export interface IMongoConnection {
  db: Db;
  connection: MongoClient;
}
