"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetFactory = void 0;
const base_factory_1 = require("./base.factory");
const utils_1 = require("../../_helper/utils");
class WidgetFactory extends base_factory_1.BaseFactory {
    constructor(db, params) {
        super(db, params);
    }
    static getInstance(db) {
        if (!WidgetFactory.instance) {
            WidgetFactory.instance = new WidgetFactory(db, { collection: 'widgets' });
        }
        return WidgetFactory.instance;
    }
    async generateOne(options) {
        return utils_1.mergeObjects({
            name: 'default-name',
            description: 'default-desc'
        }, options?.customValues);
    }
}
exports.WidgetFactory = WidgetFactory;
//# sourceMappingURL=widget.factory.js.map