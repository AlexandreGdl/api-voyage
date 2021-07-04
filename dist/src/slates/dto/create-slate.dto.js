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
exports.CreateSlateDto = void 0;
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
class CreateSlateDto {
}
__decorate([
    class_validator_1.IsMongoId(),
    class_validator_1.IsOptional(),
    __metadata("design:type", mongodb_1.ObjectId)
], CreateSlateDto.prototype, "donorId", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", mongodb_1.ObjectId)
], CreateSlateDto.prototype, "recipientId", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateSlateDto.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateSlateDto.prototype, "title", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", mongodb_1.ObjectId)
], CreateSlateDto.prototype, "voyageId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], CreateSlateDto.prototype, "multipleDonorIds", void 0);
exports.CreateSlateDto = CreateSlateDto;
//# sourceMappingURL=create-slate.dto.js.map