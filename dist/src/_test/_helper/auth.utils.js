"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecretJwt = exports.getJwt = exports.createUser = void 0;
const request = require("supertest");
const bcrypt = require("bcrypt");
const user_factory_1 = require("../factories/user.factory");
const subscription_type_enum_1 = require("../../subscription/enums/subscription-type.enum");
const subscription_utils_1 = require("./subscription.utils");
const receipt_type_enum_1 = require("../../subscription/enums/receipt-type.enum");
async function createUser(mc, userLevel, password, secretMemoryPassword, subscriptionType) {
    const userFactory = user_factory_1.UserFactory.getInstance(mc.db);
    let subscriptionId;
    if (subscriptionType) {
        const subscriptions = await subscription_utils_1.createSubscriptions(mc.db);
        subscriptionId = subscription_utils_1.getSubscription(subscriptionType, subscriptions)._id;
    }
    const bcryptPassword = await bcrypt.hash(password, parseInt(process.env.bcrypt_salt, 10));
    const bcryptSecretPassword = secretMemoryPassword && await bcrypt.hash(secretMemoryPassword, parseInt(process.env.bcrypt_salt, 10));
    return userFactory.createOne({
        customValues: {
            password: bcryptPassword,
            ...(bcryptSecretPassword && { secretMemoryPassword: bcryptSecretPassword, hasRegisteredToSecret: true }),
            level: userLevel,
            isMailValid: true,
            ...(subscriptionId && { subscriptionId }),
            ...(subscriptionType === subscription_type_enum_1.SubscriptionTypeEnum.premium && { latestReceipt: subscription_utils_1.getFakeInAppPurchase(receipt_type_enum_1.ReceiptType.IOS) })
        }
    });
}
exports.createUser = createUser;
async function getJwt(app, user) {
    return request(app.getHttpServer())
        .post('/auth/login')
        .send({
        mail: user.mail,
        password: user.password
    }).then((r) => {
        expect(r.body.token).toBeDefined();
        return r.body.token;
    });
}
exports.getJwt = getJwt;
async function getSecretJwt(app, token, password) {
    return request(app.getHttpServer())
        .post('/auth/secret-login')
        .auth(token, { type: 'bearer' })
        .send({
        password
    }).then((r) => {
        expect(r.body.token).toBeDefined();
        return r.body.token;
    });
}
exports.getSecretJwt = getSecretJwt;
//# sourceMappingURL=auth.utils.js.map