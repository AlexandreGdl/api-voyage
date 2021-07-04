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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("./users.service");
const config_service_1 = require("../config/config.service");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const create_user_dto_1 = require("./dto/create-user.dto");
let UsersController = class UsersController {
    constructor(userService, authService, env, jwtService) {
        this.userService = userService;
        this.authService = authService;
        this.env = env;
        this.jwtService = jwtService;
        this.bcryptSalt = Number(this.env.get('bcrypt_salt'));
    }
    async getUser() {
        return true;
    }
    async login(body) {
        const user = await this.userService.login(body);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const jwt = await this.jwtService.sign(user.toJSON(), { expiresIn: '30d' });
        return { token: `Bearer ${jwt}` };
    }
    async signup(newUser) {
        const user = await this.userService.signUp(newUser);
        const jwt = await this.jwtService.sign(user.toJSON(), { expiresIn: '30d' });
        return { token: `Bearer ${jwt}` };
    }
};
__decorate([
    common_1.Get(''),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    common_1.Post('/signup'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
UsersController = __decorate([
    common_1.Controller('/users'),
    swagger_1.ApiTags('👨🏻‍💻 Users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService,
        config_service_1.ConfigService,
        jwt_1.JwtService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map