"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlatesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_module_1 = require("../config/config.module");
const slates_controller_1 = require("./slates.controller");
const slates_service_1 = require("./slates.service");
const slates_schema_1 = require("./schema/slates.schema");
const users_schema_1 = require("../users/users.schema");
const voyages_schema_1 = require("../voyages/schema/voyages.schema");
let SlatesModule = class SlatesModule {
};
SlatesModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'slates', schema: slates_schema_1.SlatesSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'voyages', schema: voyages_schema_1.VoyagesSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'users', schema: users_schema_1.UsersSchema }]),
            config_module_1.ConfigModule,
        ],
        controllers: [slates_controller_1.SlatesController],
        providers: [slates_service_1.SlatesService],
        exports: [slates_service_1.SlatesService],
    })
], SlatesModule);
exports.SlatesModule = SlatesModule;
//# sourceMappingURL=slates.module.js.map