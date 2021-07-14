"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDatabase = exports.cleanObjectIds = exports.getMongoConnection = void 0;
const mongodb_1 = require("mongodb");
exports.getMongoConnection = async () => {
    let connection;
    let db;
    if (!process.env.MONGO_URL) {
        let uri;
        if (process.env.db_user && process.env.db_pass) {
            uri = `mongodb://${process.env.db_user}:${process.env.db_pass}@${process.env.db_uri}:${process.env.db_port}/${process.env.db_name}`;
        }
        else {
            uri = `mongodb://${process.env.db_uri}:${process.env.db_port}/${process.env.db_name}`;
        }
        connection = await mongodb_1.MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            loggerLevel: 'debug',
        });
        db = await connection.db(process.env.db_name);
    }
    else {
        connection = await mongodb_1.MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('jest');
    }
    return { db, connection };
};
exports.cleanObjectIds = (object) => {
    return JSON.parse(JSON.stringify(object));
};
exports.cleanDatabase = async (db) => {
    const collections = await db.listCollections().toArray();
    await Promise.all(collections.map(async (val) => {
        await db.dropCollection(val.name);
    }));
};
//# sourceMappingURL=mongo.utils.js.map