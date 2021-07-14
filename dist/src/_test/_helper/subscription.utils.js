"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFakeInAppPurchase = exports.mockNativeSubscriptionServices = exports.getSubscription = exports.createSubscriptions = void 0;
const subscription_type_enum_1 = require("../../subscription/enums/subscription-type.enum");
const subscription_factory_1 = require("../factories/subscription.factory");
const ios_subscription_service_1 = require("../../subscription/ios-subscription.service");
const receipt_type_enum_1 = require("../../subscription/enums/receipt-type.enum");
async function createSubscriptions(db) {
    const subscriptionFactory = subscription_factory_1.SubscriptionFactory.getInstance(db);
    return subscriptionFactory.createMany(3, { customValues: [
            {
                name: 'Free',
                type: subscription_type_enum_1.SubscriptionTypeEnum.free,
                price: 0,
                maxWeight: 1000000,
                maxCategories: 6,
            },
            {
                name: 'Premium',
                type: subscription_type_enum_1.SubscriptionTypeEnum.premium,
                price: 14.99,
                maxWeight: -1,
                maxCategories: -1,
                androidSubscriptionName: 'one-year-subscription',
                iosSubscriptionName: 'oneYearSubscription',
            },
            {
                name: 'Guest',
                type: subscription_type_enum_1.SubscriptionTypeEnum.guest,
                price: 0,
                maxWeight: -1,
                maxCategories: -1,
            },
        ] });
}
exports.createSubscriptions = createSubscriptions;
function getSubscription(type, subscriptions) {
    return subscriptions.find(s => s.type === type);
}
exports.getSubscription = getSubscription;
string;
 > ,
;
function mockNativeSubscriptionServices(createTestAppResult, options) {
    const iosSubscriptionService = createTestAppResult.moduleFixture.get(ios_subscription_service_1.IosSubscriptionService);
    const mockIosGetReceiptInfo = jest.spyOn(iosSubscriptionService, 'getReceiptInfo').mockImplementation(() => Promise.resolve({
        'receipt': {
            'in_app': [
                {
                    'expires_date_ms': options?.expired ? new Date(Date.now() - 10000) : new Date(Date.now() + 10000),
                }
            ]
        },
    }));
    return {
        mockIosGetReceiptInfo
    };
}
exports.mockNativeSubscriptionServices = mockNativeSubscriptionServices;
function getFakeInAppPurchase(receiptType) {
    if (receiptType === receipt_type_enum_1.ReceiptType.IOS) {
        return {
            productId: 'productId',
            transactionReceipt: 'avalidtransactionreceipt',
        };
    }
    throw Error('Cannot create fake receipt. Type is not handled');
}
exports.getFakeInAppPurchase = getFakeInAppPurchase;
//# sourceMappingURL=subscription.utils.js.map