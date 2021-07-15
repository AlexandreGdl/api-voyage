"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestingApplicationWithModule = exports.getTestingApplication = void 0;
const testing_1 = require("@nestjs/testing");
const nestjs_pino_1 = require("nestjs-pino");
const app_module_1 = require("../../app/app.module");
exports.getTestingApplication = async () => {
    const moduleFixture = await testing_1.Test.createTestingModule({
        imports: [
            app_module_1.AppModule,
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    level: 'silent'
                }
            }),
        ],
    }).compile();
    return moduleFixture.createNestApplication();
};
exports.getTestingApplicationWithModule = async () => {
    const moduleFixture = await testing_1.Test.createTestingModule({
        imports: [
            app_module_1.AppModule,
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    level: 'silent'
                }
            }),
        ],
    }).compile();
    const app = moduleFixture.createNestApplication();
    return { app, moduleFixture };
};
//# sourceMappingURL=nest-testing.utils.js.map