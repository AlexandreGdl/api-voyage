"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFactory = void 0;
const utils_1 = require("../../_helper/utils");
class BaseFactory {
    constructor(db, params) {
        this.defaultOptions = {
            isCreatingDocument: true,
        };
        this.db = db;
        this.params = params;
    }
    ;
    async createOne(options) {
        options = utils_1.mergeObjects(this.defaultOptions, options);
        const generatedObject = await this.generateOne(options);
        if (options.isCreatingDocument && this.params.collection !== 'none') {
            const { ops } = await this.db.collection(this.params.collection).insertOne(generatedObject);
            return ops[0];
        }
        return generatedObject;
    }
    ;
    async createMany(amount, options) {
        options = utils_1.mergeObjects(this.defaultOptions, options);
        const generatedObjects = await Promise.all(Array.from(Array(amount), (_, i) => {
            const opts = {
                ...options,
                customValues: options.customValues instanceof Array
                    ? options.customValues?.[i]
                    : options.customValues,
            };
            return this.generateOne(opts);
        }));
        if (options.isCreatingDocument && this.params.collection !== 'none') {
            const { ops } = await this.db.collection(this.params.collection).insertMany(generatedObjects);
            return ops;
        }
        return generatedObjects;
    }
    ;
}
exports.BaseFactory = BaseFactory;
//# sourceMappingURL=base.factory.js.map