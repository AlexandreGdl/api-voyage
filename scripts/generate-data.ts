import {MongoClient, ObjectId} from "mongodb";
import {ConfigService} from "../src/config/config.service";
import { IMongoConnection } from '../src/_test/helper/mongo.utils';
import {TypeFactory} from "../src/_test/factories/type.factory";
import {Types} from "../src/types/types.schema";
import { types } from './types';
import { monuments } from './monuments';
import { supermarkets } from "./supermarket";
import { malls } from "./mall";
import {Places} from "../src/places/schema/places.schema";
import {PlaceFactory} from "../src/_test/factories/place.factory";
import {pointsOfViews} from "./point-of-view";
import {restaurantsAndBars} from "./data";


/**
 * Connect to the dev database
 * @returns {Promise<IMongoConnection>} connectino and db object.
 */
const connect = async (): Promise<IMongoConnection> => {
  const configService = new ConfigService('.env.development');

  const connection = await MongoClient.connect(configService.qualifiedMongoUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await connection.db(process.env.db_name);
  console.log('✓ Successfully connect to the database');

  return { connection, db };
};

/**
 * Clean the database deleting all documents.
 * @param {IMongoConnection} mc mongo connection reference
 */
const clean = async (mc: IMongoConnection): Promise<void> => {
  const { db } = mc;
  const collections = await db.listCollections().toArray();
  await Promise.all(collections.map(async (val) => {
    console.log(val.name);
    await db.dropCollection(val.name);
  }));
  console.log('✓ Successfully clean database');
};

/**
 * Close opened processes
 * @param {IMongoConnection} mc mongo connection reference
 */
const close = async (mc: IMongoConnection): Promise<void> => {
  await mc.connection.close();
};

/**
 * Generate data in the dev database using factories.
 * @param {IMongoConnection} mc mongo connection reference
 */
const generateData = async (mc: IMongoConnection): Promise<void> => {
  const configService = new ConfigService('.env.development');
  const typeFactory = TypeFactory.getInstance(mc.db);
  const placeFactory = PlaceFactory.getInstance(mc.db);

  const session = mc.connection.startSession();

  try {
    await session.withTransaction(async () => {

      const typeRestaurent = await typeFactory.createOne( {
        customValues: {
          name: types[0].name
        } as Types
      });

      const typeSupermarket = await typeFactory.createOne( {
        customValues: {
          name: types[1].name
        } as Types
      });

      const typeMonument = await typeFactory.createOne( {
        customValues: {
          name: types[2].name
        } as Types
      });

      const typeMall = await typeFactory.createOne( {
        customValues: {
          name: types[3].name
        } as Types
      });

      const typePointOfView = await typeFactory.createOne( {
        customValues: {
          name: types[4].name
        } as Types
      });

      console.log(`
        ✓ All types were created : 
          - ${typeRestaurent.name}
          - ${typeSupermarket.name}
          - ${typeMonument.name}
          - ${typeMall.name}
          - ${typePointOfView.name}
      `);

      console.log('Creating Places ...');

      const getTypeId = (type: string) => {
        switch(type) {
          case typeRestaurent.name:
            return typeRestaurent._id
            break;
          case typeSupermarket.name:
            return typeSupermarket._id
            break;
          case typeMonument.name:
            return typeMonument._id
            break;
          case typeMall.name:
            return typeMall._id
            break;
          case typePointOfView.name:
            return typePointOfView._id
            break;
          default:
            return new ObjectId();
            break;
        }
      }

      console.log(`
        Creating Monuments ...
        `);

      await Promise.all(
        monuments.map(async (monument) => {
          let typeId = getTypeId(monument.type);

          await placeFactory.createOne( {
            customValues: {
              isGlobal: true,
              name: monument.name,
              typeId,
              position: monument.localisation
            } as Places
          });
        })
      );

      console.log(`
        ✓ Monuments Created
        `);

      console.log(`
        Creating SuperMarkets ...
        `);

      await Promise.all(
        supermarkets.map(async (supermarket) => {
          let typeId = getTypeId(supermarket.type);

          await placeFactory.createOne( {
            customValues: {
              isGlobal: true,
              name: supermarket.name,
              typeId,
              position: supermarket.localisation
            } as Places
          });
        })
      );

      console.log(`
        ✓ Supermarkets Created
        `);

      console.log(`
        Creating Malls ...
        `);

      await Promise.all(
        malls.map(async (mall) => {
          let typeId = getTypeId(mall.type);

          await placeFactory.createOne( {
            customValues: {
              isGlobal: true,
              name: mall.name,
              typeId,
              position: mall.localisation
            } as Places
          });
        })
      );

      console.log(`
        ✓ Malls Created
        `);

      console.log(`
        Creating Points of view ...
        `);

      await Promise.all(
        pointsOfViews.map(async (pov) => {
          let typeId = getTypeId(pov.type);

          await placeFactory.createOne( {
            customValues: {
              isGlobal: true,
              name: pov.name,
              typeId,
              position: pov.localisation
            } as Places
          });
        })
      );

      console.log(`
        ✓ Points of View Created
        `);

      console.log(`
        Creating Restaurants & Bars ...
        `);

      await Promise.all(
        restaurantsAndBars.map(async (place) => {
          let typeId = getTypeId(place.type);

          await placeFactory.createOne( {
            customValues: {
              isGlobal: true,
              name: place.name,
              typeId,
              position: place.localisation
            } as Places
          });
        })
      );

      console.log(`
        ✓ Restaurants & Bars Created
        `);

      console.log(`
      
        ✓✓ PlACES CREATED ✓✓
        
        `);


    });
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Function to process async tasks. Starting point of the script.
 */
const start = async (): Promise<void> => {
  const mc = await connect();
  await clean(mc);
  await generateData(mc);
  await close(mc);
};

start();
