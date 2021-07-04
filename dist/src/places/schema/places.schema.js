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
exports.PlacesSchema = exports.Places = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongodb_1 = require("mongodb");
let Places = class Places extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", mongodb_1.ObjectId)
], Places.prototype, "typeId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", mongodb_1.ObjectId)
], Places.prototype, "voyageId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Object)
], Places.prototype, "position", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Places.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", mongodb_1.ObjectId)
], Places.prototype, "mediaId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Boolean)
], Places.prototype, "isGlobal", void 0);
Places = __decorate([
    mongoose_1.Schema()
], Places);
exports.Places = Places;
exports.PlacesSchema = mongoose_1.SchemaFactory.createForClass(Places);
//# sourceMappingURL=places.schema.js.map