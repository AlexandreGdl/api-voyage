"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const base_factory_1 = require("./base.factory");
const utils_1 = require("../../_helper/utils");
class UserFactory extends base_factory_1.BaseFactory {
    constructor(db, params) {
        super(db, params);
    }
    static getInstance(db) {
        if (!UserFactory.instance) {
            UserFactory.instance = new UserFactory(db, { collection: 'users' });
        }
        return UserFactory.instance;
    }
    async generateOne(options) {
        return utils_1.mergeObjects({
            password: 'Test123@',
            phoneNumber: '06999999',
            email: 'test@gmail.com',
            username: 'test'
        }, options?.customValues);
    }
}
exports.UserFactory = UserFactory;
//# sourceMappingURL=user.factory.js.map