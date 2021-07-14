import {MongoClient, ObjectId} from "mongodb";
import {ConfigService} from "../src/config/config.service";
import { IMongoConnection } from '../src/_test/helper/mongo.utils';
import {TypeFactory} from "../src/_test/factories/type.factory";
import {Types} from "../src/types/types.schema";
import { types } from './types';
import { monuments } from './monuments';
import { supermarkets } from "./supermarket";
import { malls } from "./mall";
import { widgets } from "./widgets";
import {Places} from "../src/places/schema/places.schema";
import {PlaceFactory} from "../src/_test/factories/place.factory";
import {pointsOfViews} from "./point-of-view";
import {restaurantsAndBars} from "./data";
import {WidgetFactory} from "../src/_test/factories/widget.factory";
import {Widgets} from "../src/widgets/schema/widgets.schema";


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
  const widgetFactory = WidgetFactory.getInstance(mc.db);

  const session = mc.connection.startSession();

  try {
    await session.withTransaction(async () => {

      const typeRestaurent = await typeFactory.createOne( {
        customValues: {
          name: types[0].name
        } as Types
      });

      console.log(typeRestaurent._id);

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

      console.log(`
               - ${typeRestaurent._id}
          - ${typeSupermarket._id}
          - ${typeMonument._id}
          - ${typeMall._id}
          - ${typePointOfView._id}
      `)

      const widgetAgenda = await widgetFactory.createOne( {
        customValues: {
          name: widgets[0].name
        } as Widgets
      });

      const widgetWallet = await widgetFactory.createOne( {
        customValues: {
          name: widgets[1].name
        } as Widgets
      });

      const widgetAccount = await widgetFactory.createOne( {
        customValues: {
          name: widgets[2].name
        } as Widgets
      });

      const widgetDocument = await widgetFactory.createOne( {
        customValues: {
          name: widgets[3].name
        } as Widgets
      });

      const widgetMap = await widgetFactory.createOne( {
        customValues: {
          name: widgets[4].name
        } as Widgets
      });

      const widgetNote = await widgetFactory.createOne( {
        customValues: {
          name: widgets[5].name
        } as Widgets
      });

      console.log(`
        ✓ All Widgets were created : 
          - ${widgetWallet.name}
          - ${widgetDocument.name}
          - ${widgetAgenda.name}
          - ${widgetAccount.name}
          - ${widgetMap.name}
          - ${widgetNote.name}
      `);

      console.log('Creating Places ...');

      console.log(`
        Creating Monuments ...
        `);

      await Promise.all(
        monuments.map(async (monument) => {

          await placeFactory.createOne( {
            customValues: {
              isGlobal: true,
              name: monument.name,
              typeId: typeMonument._id,
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

          await placeFactory.createOne( {
            customValues: {
              isGlobal: true,
              name: supermarket.name,
              typeId: typeSupermarket._id,
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

          await placeFactory.createOne( {
            customValues: {
              isGlobal: true,
              name: mall.name,
              typeId: typeMall._id,
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

          await placeFactory.createOne( {
            customValues: {
              isGlobal: true,
              name: pov.name,
              typeId: typePointOfView._id,
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

          await placeFactory.createOne( {
            customValues: {
              isGlobal: true,
              name: place.name,
              typeId: typeRestaurent._id,
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
