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
exports.WidgetsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_service_1 = require("../config/config.service");
const passport_1 = require("@nestjs/passport");
const auth_user_decorator_1 = require("../security/decorator/auth-user.decorator");
const users_schema_1 = require("../users/users.schema");
const widgets_service_1 = require("./widgets.service");
let WidgetsController = class WidgetsController {
    constructor(env, widgetService) {
        this.env = env;
        this.widgetService = widgetService;
        this.bcryptSalt = Number(this.env.get('bcrypt_salt'));
    }
    async getWidgets() {
        return this.widgetService.getWidgets();
    }
};
__decorate([
    common_1.Get(''),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WidgetsController.prototype, "getWidgets", null);
WidgetsController = __decorate([
    common_1.Controller('/widgets'),
    swagger_1.ApiTags('⚙️ Widgets'),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        widgets_service_1.WidgetService])
], WidgetsController);
exports.WidgetsController = WidgetsController;
//# sourceMappingURL=widgets.controller.js.map