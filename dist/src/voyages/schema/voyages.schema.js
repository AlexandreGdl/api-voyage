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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoyagesSchema = exports.Voyages = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongodb_1 = require("mongodb");
let Voyages = class Voyages extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", mongodb_1.ObjectId)
], Voyages.prototype, "ownerId", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", Array)
], Voyages.prototype, "memberIds", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Voyages.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", Array)
], Voyages.prototype, "selectedWidgets", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Voyages.prototype, "defaultName", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Voyages.prototype, "createdDate", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Voyages.prototype, "startDate", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], Voyages.prototype, "endDate", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Voyages.prototype, "cityName", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Object)
], Voyages.prototype, "location", void 0);
Voyages = __decorate([
    mongoose_1.Schema()
], Voyages);
exports.Voyages = Voyages;
exports.VoyagesSchema = mongoose_1.SchemaFactory.createForClass(Voyages);
//# sourceMappingURL=voyages.schema.js.map