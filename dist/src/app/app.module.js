"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("../users/users.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_module_1 = require("../config/config.module");
const config_service_1 = require("../config/config.service");
const passport_1 = require("@nestjs/passport");
const users_schema_1 = require("../users/users.schema");
const jwt_1 = require("@nestjs/jwt");
const notes_module_1 = require("../notes/notes.module");
const places_module_1 = require("../places/places.module");
const voyages_module_1 = require("../voyages/voyages.module");
const types_module_1 = require("../types/types.module");
const widgets_module_1 = require("../widgets/widgets.module");
const slates_module_1 = require("../slates/slates.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                inject: [config_service_1.ConfigService],
                useFactory: async (env) => ({
                    uri: env.qualifiedMongoUri(),
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    loggerLevel: env.get('MONGO_DEBUG_LEVEL') || 'error',
                })
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            mongoose_1.MongooseModule.forFeature([{ name: 'users', schema: users_schema_1.UsersSchema }]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_module_1.ConfigModule],
                inject: [config_service_1.ConfigService],
                useFactory: async (env) => ({
                    secret: env.get('jwt_secret'),
                    signOptions: { expiresIn: '30d' },
                }),
            }),
            config_module_1.ConfigModule,
            users_module_1.UsersModule,
            notes_module_1.NotesModule,
            places_module_1.PlacesModule,
            widgets_module_1.WidgetsModule,
            voyages_module_1.VoyagesModule,
            types_module_1.TypesModule,
            slates_module_1.SlatesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map