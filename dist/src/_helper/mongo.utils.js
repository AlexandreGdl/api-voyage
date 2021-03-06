"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookUpRecipients = exports.lookUpDonors = void 0;
exports.lookUpDonors = [
    { $lookup: {
            from: 'users',
            let: { userId: '$slates.donorId' },
            pipeline: [
                { $match: { $expr: { $in: ['$_id', '$$userId'] } }, },
                { $project: { password: 0 } }
            ],
            as: 'slates_donors'
        } },
    { $addFields: {
            'slates.donorUser': { $arrayElemAt: ['$slates_donors', { $indexOfArray: ['$slates_donors', { _id: '$slates.donorId' }] }] }
        } },
    { $project: { slates_donors: 0 } }
];
exports.lookUpRecipients = [
    { $lookup: {
            from: 'users',
            let: { userId: '$slates.recipientId' },
            pipeline: [
                { $match: { $expr: { $in: ['$_id', '$$userId'] } }, },
                { $project: { password: 0 } }
            ],
            as: 'slates_recipients'
        } },
    { $addFields: {
            'slates.recipientUser': { $arrayElemAt: ['$slates_recipients', { $indexOfArray: ['$slates_recipients', { _id: '$slates.recipientId' }] }] }
        } },
    { $project: { slates_recipients: 0 } }
];
//# sourceMappingURL=mongo.utils.js.map