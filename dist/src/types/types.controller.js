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
exports.TypesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_service_1 = require("../config/config.service");
const passport_1 = require("@nestjs/passport");
const types_service_1 = require("./types.service");
const auth_user_decorator_1 = require("../security/decorator/auth-user.decorator");
const users_schema_1 = require("../users/users.schema");
const create_types_dto_1 = require("./dto/create-types.dto");
let TypesController = class TypesController {
    constructor(typesService, env) {
        this.typesService = typesService;
        this.env = env;
    }
    async getTypes() {
        return this.typesService.getAllTypes();
    }
    async createType(user, body) {
        if (!body.admin_secret_key)
            throw new common_1.UnauthorizedException('Bad request');
        if (body.admin_secret_key && body.admin_secret_key !== this.env.get('admin_secret_key'))
            throw new common_1.UnauthorizedException('Bad request');
        return this.typesService.createType(body.name);
    }
};
__decorate([
    common_1.Get(''),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TypesController.prototype, "getTypes", null);
__decorate([
    common_1.Post(''),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, auth_user_decorator_1.AuthUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_schema_1.Users, create_types_dto_1.CreateTypesDto]),
    __metadata("design:returntype", Promise)
], TypesController.prototype, "createType", null);
TypesController = __decorate([
    common_1.Controller('/types'),
    swagger_1.ApiTags('🔖 Types'),
    __metadata("design:paramtypes", [types_service_1.TypesService,
        config_service_1.ConfigService])
], TypesController);
exports.TypesController = TypesController;
//# sourceMappingURL=types.controller.js.map