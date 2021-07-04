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
exports.SlatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_service_1 = require("../config/config.service");
const passport_1 = require("@nestjs/passport");
const auth_user_decorator_1 = require("../security/decorator/auth-user.decorator");
const create_slate_dto_1 = require("./dto/create-slate.dto");
const users_schema_1 = require("../users/users.schema");
const slates_service_1 = require("./slates.service");
let SlatesController = class SlatesController {
    constructor(env, slatesService) {
        this.env = env;
        this.slatesService = slatesService;
        this.bcryptSalt = Number(this.env.get('bcrypt_salt'));
    }
    async createSlates(user, newSlates) {
        return this.slatesService.createSlates(newSlates);
    }
};
__decorate([
    common_1.Post(''),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, auth_user_decorator_1.AuthUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_schema_1.Users, create_slate_dto_1.CreateSlateDto]),
    __metadata("design:returntype", Promise)
], SlatesController.prototype, "createSlates", null);
SlatesController = __decorate([
    common_1.Controller('/slates'),
    swagger_1.ApiTags('📝 Slates'),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        slates_service_1.SlatesService])
], SlatesController);
exports.SlatesController = SlatesController;
//# sourceMappingURL=slates.controller.js.map