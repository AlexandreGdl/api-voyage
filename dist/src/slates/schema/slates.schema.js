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
exports.SlatesSchema = exports.Slates = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongodb_1 = require("mongodb");
let Slates = class Slates extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", mongodb_1.ObjectId)
], Slates.prototype, "donorId", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", mongodb_1.ObjectId)
], Slates.prototype, "recipientId", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], Slates.prototype, "amount", void 0);
__decorate([
    mongoose_1.Prop({ default: false, required: true }),
    __metadata("design:type", Boolean)
], Slates.prototype, "completed", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Slates.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", mongodb_1.ObjectId)
], Slates.prototype, "voyageId", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Date)
], Slates.prototype, "date", void 0);
Slates = __decorate([
    mongoose_1.Schema()
], Slates);
exports.Slates = Slates;
exports.SlatesSchema = mongoose_1.SchemaFactory.createForClass(Slates);
//# sourceMappingURL=slates.schema.js.map