"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceFactory = void 0;
const mongodb_1 = require("mongodb");
const base_factory_1 = require("./base.factory");
const utils_1 = require("../../_helper/utils");
class PlaceFactory extends base_factory_1.BaseFactory {
    constructor(db, params) {
        super(db, params);
    }
    static getInstance(db) {
        if (!PlaceFactory.instance) {
            PlaceFactory.instance = new PlaceFactory(db, { collection: 'places' });
        }
        return PlaceFactory.instance;
    }
    async generateOne(options) {
        const position = {
            long: 0,
            lat: 0
        };
        return utils_1.mergeObjects({
            typeId: new mongodb_1.ObjectId(),
            position,
            name: 'default-name',
        }, options?.customValues);
    }
}
exports.PlaceFactory = PlaceFactory;
//# sourceMappingURL=place.factory.js.map