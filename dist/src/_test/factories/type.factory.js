"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeFactory = void 0;
const base_factory_1 = require("./base.factory");
const utils_1 = require("../../_helper/utils");
class TypeFactory extends base_factory_1.BaseFactory {
    constructor(db, params) {
        super(db, params);
    }
    static getInstance(db) {
        if (!TypeFactory.instance) {
            TypeFactory.instance = new TypeFactory(db, { collection: 'types' });
        }
        return TypeFactory.instance;
    }
    async generateOne(options) {
        return utils_1.mergeObjects({
            name: 'default-name'
        }, options?.customValues);
    }
}
exports.TypeFactory = TypeFactory;
//# sourceMappingURL=type.factory.js.map