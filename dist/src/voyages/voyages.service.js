"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoyagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongodb_1 = require("mongodb");
const users_schema_1 = require("../users/users.schema");
const mongo_utils_1 = require("../_helper/mongo.utils");
let VoyagesService = class VoyagesService {
    constructor(voyagesModel, widgetsModel, usersModel) {
        this.voyagesModel = voyagesModel;
        this.widgetsModel = widgetsModel;
        this.usersModel = usersModel;
    }
    async createVoyage(newVoyages, userId) {
        const createdVoyage = await this.voyagesModel.create({
            ...newVoyages,
            ownerId: userId,
            createdDate: new Date()
        });
        return createdVoyage;
    }
    async findVoyage(id) {
        return this.voyagesModel.findById(id);
    }
    async addMember(addMember) {
        const member = await this.usersModel.findOne({ username: addMember.username });
        console.log('tototo');
        console.log({ username: addMember.username });
        if (!member)
            throw new common_1.NotFoundException('Member not found');
        console.log('tototo 2');
        const updatedVoyage = await this.voyagesModel.findOneAndUpdate({ _id: addMember.voyageId }, { $push: { memberIds: new mongodb_1.ObjectId(member._id) } });
        console.log('tototo');
        return updatedVoyage;
    }
    async toggleWidget(body) {
        const voyage = await this.voyagesModel.findOne({ _id: new mongodb_1.ObjectId(body.voyageId) });
        const widget = await this.widgetsModel.findById(body.widgetId);
        if (!voyage)
            throw new common_1.NotFoundException('Voyage not found');
        if (!widget)
            throw new common_1.NotFoundException('Widget not found');
        if (voyage.selectedWidgets.indexOf(widget._id) === -1) {
            return this.voyagesModel.findOneAndUpdate({ _id: new mongodb_1.ObjectId(body.voyageId) }, { $push: { selectedWidgets: new mongodb_1.ObjectId(widget._id) } });
        }
        else {
            return this.voyagesModel.findOneAndUpdate({ _id: new mongodb_1.ObjectId(body.voyageId) }, { $pull: { selectedWidgets: new mongodb_1.ObjectId(widget._id) } });
        }
    }
    async getUsersVoyage(userId) {
        return this.voyagesModel.aggregate([
            { $match: { $or: [{ ownerId: userId }, { memberIds: userId }] } },
            { $sort: { createdDate: -1 } },
            { $lookup: {
                    from: 'users',
                    let: { memberId: '$memberIds' },
                    pipeline: [
                        { $match: { $expr: { $in: ['$_id', '$$memberId'] } } },
                        { $project: { password: 0 } }
                    ],
                    as: 'members'
                } },
            { $lookup: {
                    from: 'users',
                    localField: 'ownerId',
                    foreignField: '_id',
                    as: 'owner'
                } },
            { $unwind: { preserveNullAndEmptyArrays: true, path: '$owner' } },
            { $lookup: {
                    from: 'widgets',
                    localField: 'selectedWidgets',
                    foreignField: '_id',
                    as: 'activeWidgets'
                } },
            { $project: { 'owner.password': 0 } },
            { $lookup: {
                    from: 'slates',
                    localField: '_id',
                    foreignField: 'voyageId',
                    as: 'slates'
                } },
            ...mongo_utils_1.lookUpDonors,
            ...mongo_utils_1.lookUpRecipients
        ]);
    }
};
VoyagesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('voyages')),
    __param(1, mongoose_1.InjectModel('widgets')),
    __param(2, mongoose_1.InjectModel('users')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], VoyagesService);
exports.VoyagesService = VoyagesService;
//# sourceMappingURL=voyages.service.js.map