"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_module_1 = require("../config/config.module");
const widgets_schema_1 = require("./schema/widgets.schema");
const widgets_controller_1 = require("./widgets.controller");
const widgets_service_1 = require("./widgets.service");
let WidgetsModule = class WidgetsModule {
};
WidgetsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'widgets', schema: widgets_schema_1.WidgetsSchema }]),
            config_module_1.ConfigModule,
        ],
        controllers: [widgets_controller_1.WidgetsController],
        providers: [widgets_service_1.WidgetService],
        exports: [widgets_service_1.WidgetService],
    })
], WidgetsModule);
exports.WidgetsModule = WidgetsModule;
//# sourceMappingURL=widgets.module.js.map