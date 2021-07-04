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
exports.SlatesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongodb_1 = require("mongodb");
let SlatesService = class SlatesService {
    constructor(slatesModel, voyagesModel, usersModel) {
        this.slatesModel = slatesModel;
        this.voyagesModel = voyagesModel;
        this.usersModel = usersModel;
    }
    async getAllSlates() {
        return this.slatesModel.find({});
    }
    async createSlates(slates) {
        const donor = await this.usersModel.findById(slates.donorId);
        const recipient = await this.usersModel.findById(slates.recipientId);
        const voyage = await this.voyagesModel.findById(slates.voyageId);
        if (!recipient || (slates.donorId && !donor) || !voyage)
            throw new common_1.NotFoundException('Entity not found');
        if (slates.multipleDonorIds && slates.multipleDonorIds[0]) {
            return Promise.all(slates.multipleDonorIds.map((donorId) => {
                return this.slatesModel.create({
                    ...slates,
                    donorId: new mongodb_1.ObjectId(donorId),
                    recipientId: new mongodb_1.ObjectId(slates.recipientId),
                    voyageId: new mongodb_1.ObjectId(slates.voyageId),
                    completed: false
                });
            }));
        }
        if (slates.donorId) {
            return this.slatesModel.create({
                ...slates,
                donorId: new mongodb_1.ObjectId(slates.donorId),
                recipientId: new mongodb_1.ObjectId(slates.recipientId),
                voyageId: new mongodb_1.ObjectId(slates.voyageId),
                completed: false
            });
        }
    }
};
SlatesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('slates')),
    __param(1, mongoose_1.InjectModel('voyages')),
    __param(2, mongoose_1.InjectModel('users')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SlatesService);
exports.SlatesService = SlatesService;
//# sourceMappingURL=slates.service.js.map