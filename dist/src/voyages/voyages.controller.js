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
exports.VoyagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_service_1 = require("../config/config.service");
const passport_1 = require("@nestjs/passport");
const voyages_service_1 = require("./voyages.service");
const auth_user_decorator_1 = require("../security/decorator/auth-user.decorator");
const users_schema_1 = require("../users/users.schema");
const create_voyage_dto_1 = require("./dto/create-voyage.dto");
const add_member_dto_1 = require("./dto/add-member.dto");
const toggle_widget_dto_1 = require("./dto/toggle-widget.dto");
let VoyagesController = class VoyagesController {
    constructor(voyagesService, env) {
        this.voyagesService = voyagesService;
        this.env = env;
        this.bcryptSalt = Number(this.env.get('bcrypt_salt'));
    }
    async getVoyages(user) {
        return this.voyagesService.getUsersVoyage(user._id);
    }
    async createVoyage(user, newVoyages) {
        return this.voyagesService.createVoyage(newVoyages, user._id);
    }
    async addMember(user, addMember) {
        const voyage = await this.voyagesService.findVoyage(addMember.voyageId);
        console.log('toto');
        if (!voyage)
            throw new common_1.NotFoundException('Voyage not found');
        if (voyage.ownerId.toString() !== user._id.toString())
            throw new common_1.UnauthorizedException('You are not the owner');
        return this.voyagesService.addMember(addMember);
    }
    async toggleWidget(user, body) {
        return this.voyagesService.toggleWidget(body);
    }
};
__decorate([
    common_1.Get(''),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_schema_1.Users]),
    __metadata("design:returntype", Promise)
], VoyagesController.prototype, "getVoyages", null);
__decorate([
    common_1.Post(''),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, auth_user_decorator_1.AuthUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_schema_1.Users, create_voyage_dto_1.CreateVoyageDto]),
    __metadata("design:returntype", Promise)
], VoyagesController.prototype, "createVoyage", null);
__decorate([
    common_1.Put('/add-members'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, auth_user_decorator_1.AuthUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_schema_1.Users, add_member_dto_1.AddMemberDto]),
    __metadata("design:returntype", Promise)
], VoyagesController.prototype, "addMember", null);
__decorate([
    common_1.Put('/widgets'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, auth_user_decorator_1.AuthUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_schema_1.Users, toggle_widget_dto_1.ToggleWidgetDto]),
    __metadata("design:returntype", Promise)
], VoyagesController.prototype, "toggleWidget", null);
VoyagesController = __decorate([
    common_1.Controller('/voyages'),
    swagger_1.ApiTags('✈️ Voyages'),
    __metadata("design:paramtypes", [voyages_service_1.VoyagesService,
        config_service_1.ConfigService])
], VoyagesController);
exports.VoyagesController = VoyagesController;
//# sourceMappingURL=voyages.controller.js.map