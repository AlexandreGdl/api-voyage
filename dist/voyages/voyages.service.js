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
let VoyagesService = class VoyagesService {
    constructor(voyagesModel) {
        this.voyagesModel = voyagesModel;
    }
    async createVoyage(newVoyages, userId) {
        const createdVoyage = await this.voyagesModel.create({
            ...newVoyages,
            ownerId: userId,
        });
        return createdVoyage;
    }
    async findVoyage(id) {
        return this.voyagesModel.findById(id);
    }
    async addMember(addMember) {
        const updatedVoyage = await this.voyagesModel.findOneAndUpdate({ _id: addMember.voyageId }, { $push: { memberIds: new mongodb_1.ObjectId(addMember.userId) } });
        return updatedVoyage;
    }
};
VoyagesService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('voyages')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VoyagesService);
exports.VoyagesService = VoyagesService;
//# sourceMappingURL=voyages.service.js.map