import { MongoClient, Db } from 'mongodb';
import { Document } from 'mongoose';

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

/**
 * get a mongo instance to make query in the test files directly on the mongodb
 * @returns {Promise<{db: Db, connection: MongoClient}>} mongo connection object
 */
export const getMongoConnection = async (): Promise<{db: Db, connection: MongoClient}> => {
  let connection;
  let db;

  if (!process.env.MONGO_URL) {
    let uri: string;
    if (process.env.db_user && process.env.db_pass) {
      uri = `mongodb://${process.env.db_user}:${process.env.db_pass}@${process.env.db_uri}:${process.env.db_port}/${process.env.db_name}`;
    } else {
      uri = `mongodb://${process.env.db_uri}:${process.env.db_port}/${process.env.db_name}`;
    }
    connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      loggerLevel: 'debug',
    });
    db = await connection.db(process.env.db_name);
  } else {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('jest');
  }

  return { db, connection };
};

/**
 * Transform all mongo ObjectIds to strings. Useful when trying to compare a result
 * of a mongo query with a result of an API Request returning the result of a mongo query.
 * @param {Document | Document[]} object object to transform
 * @returns {Document | Document[]} the transformed object
 */
export const cleanObjectIds = (object: Document | Document[]): Document | Document[] => {
  return JSON.parse(JSON.stringify(object));
};

/**
 * Remove all entries in the given database.
 * @param {Db} db the db you want to clean
 * @returns {Promise<void>}
 */
export const cleanDatabase = async (db: Db): Promise<void> => {
  const collections = await db.listCollections().toArray();
  await Promise.all(collections.map(async (val) => {
    await db.dropCollection(val.name);
  }));
};
