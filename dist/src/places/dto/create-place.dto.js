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
exports.CreatePlaceDto = void 0;
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
class CreatePlaceDto {
}
__decorate([
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", mongodb_1.ObjectId)
], CreatePlaceDto.prototype, "typeId", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    class_validator_1.IsOptional(),
    __metadata("design:type", mongodb_1.ObjectId)
], CreatePlaceDto.prototype, "voyageId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "position", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], CreatePlaceDto.prototype, "isGlobal", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "admin_secret_key", void 0);
exports.CreatePlaceDto = CreatePlaceDto;
//# sourceMappingURL=create-place.dto.js.map