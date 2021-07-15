"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_service_1 = require("../src/config/config.service");
const type_factory_1 = require("../src/_test/factories/type.factory");
const types_1 = require("./types");
const monuments_1 = require("./monuments");
const supermarket_1 = require("./supermarket");
const mall_1 = require("./mall");
const widgets_1 = require("./widgets");
const place_factory_1 = require("../src/_test/factories/place.factory");
const point_of_view_1 = require("./point-of-view");
const data_1 = require("./data");
const widget_factory_1 = require("../src/_test/factories/widget.factory");
const connect = async () => {
    const configService = new config_service_1.ConfigService('.env.development');
    const connection = await mongodb_1.MongoClient.connect(configService.qualifiedMongoUri(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = await connection.db(process.env.db_name);
    console.log('✓ Successfully connect to the database');
    return { connection, db };
};
const clean = async (mc) => {
    const { db } = mc;
    const collections = await db.listCollections().toArray();
    await Promise.all(collections.map(async (val) => {
        console.log(val.name);
        await db.dropCollection(val.name);
    }));
    console.log('✓ Successfully clean database');
};
const close = async (mc) => {
    await mc.connection.close();
};
const generateData = async (mc) => {
    const configService = new config_service_1.ConfigService('.env.development');
    const typeFactory = type_factory_1.TypeFactory.getInstance(mc.db);
    const placeFactory = place_factory_1.PlaceFactory.getInstance(mc.db);
    const widgetFactory = widget_factory_1.WidgetFactory.getInstance(mc.db);
    const session = mc.connection.startSession();
    try {
        await session.withTransaction(async () => {
            const typeRestaurent = await typeFactory.createOne({
                customValues: {
                    name: types_1.types[0].name
                }
            });
            console.log(typeRestaurent._id);
            const typeSupermarket = await typeFactory.createOne({
                customValues: {
                    name: types_1.types[1].name
                }
            });
            const typeMonument = await typeFactory.createOne({
                customValues: {
                    name: types_1.types[2].name
                }
            });
            const typeMall = await typeFactory.createOne({
                customValues: {
                    name: types_1.types[3].name
                }
            });
            const typePointOfView = await typeFactory.createOne({
                customValues: {
                    name: types_1.types[4].name
                }
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
      `);
            const widgetAgenda = await widgetFactory.createOne({
                customValues: {
                    name: widgets_1.widgets[0].name
                }
            });
            const widgetWallet = await widgetFactory.createOne({
                customValues: {
                    name: widgets_1.widgets[1].name
                }
            });
            const widgetAccount = await widgetFactory.createOne({
                customValues: {
                    name: widgets_1.widgets[2].name
                }
            });
            const widgetDocument = await widgetFactory.createOne({
                customValues: {
                    name: widgets_1.widgets[3].name
                }
            });
            const widgetMap = await widgetFactory.createOne({
                customValues: {
                    name: widgets_1.widgets[4].name
                }
            });
            const widgetNote = await widgetFactory.createOne({
                customValues: {
                    name: widgets_1.widgets[5].name
                }
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
            await Promise.all(monuments_1.monuments.map(async (monument) => {
                await placeFactory.createOne({
                    customValues: {
                        isGlobal: true,
                        name: monument.name,
                        typeId: typeMonument._id,
                        position: monument.localisation
                    }
                });
            }));
            console.log(`
        ✓ Monuments Created
        `);
            console.log(`
        Creating SuperMarkets ...
        `);
            await Promise.all(supermarket_1.supermarkets.map(async (supermarket) => {
                await placeFactory.createOne({
                    customValues: {
                        isGlobal: true,
                        name: supermarket.name,
                        typeId: typeSupermarket._id,
                        position: supermarket.localisation
                    }
                });
            }));
            console.log(`
        ✓ Supermarkets Created
        `);
            console.log(`
        Creating Malls ...
        `);
            await Promise.all(mall_1.malls.map(async (mall) => {
                await placeFactory.createOne({
                    customValues: {
                        isGlobal: true,
                        name: mall.name,
                        typeId: typeMall._id,
                        position: mall.localisation
                    }
                });
            }));
            console.log(`
        ✓ Malls Created
        `);
            console.log(`
        Creating Points of view ...
        `);
            await Promise.all(point_of_view_1.pointsOfViews.map(async (pov) => {
                await placeFactory.createOne({
                    customValues: {
                        isGlobal: true,
                        name: pov.name,
                        typeId: typePointOfView._id,
                        position: pov.localisation
                    }
                });
            }));
            console.log(`
        ✓ Points of View Created
        `);
            console.log(`
        Creating Restaurants & Bars ...
        `);
            await Promise.all(data_1.restaurantsAndBars.map(async (place) => {
                await placeFactory.createOne({
                    customValues: {
                        isGlobal: true,
                        name: place.name,
                        typeId: typeRestaurent._id,
                        position: place.localisation
                    }
                });
            }));
            console.log(`
        ✓ Restaurants & Bars Created
        `);
            console.log(`
      
        ✓✓ PlACES CREATED ✓✓
        
        `);
        });
    }
    catch (e) {
        throw new Error(e);
    }
};
const start = async () => {
    const mc = await connect();
    await clean(mc);
    await generateData(mc);
    await close(mc);
};
start();
//# sourceMappingURL=generate-data.js.map