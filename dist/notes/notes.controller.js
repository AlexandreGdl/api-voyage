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
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_service_1 = require("../config/config.service");
const passport_1 = require("@nestjs/passport");
const auth_user_decorator_1 = require("../security/decorator/auth-user.decorator");
const create_note_dto_1 = require("./dto/create-note.dto");
const users_schema_1 = require("../users/users.schema");
const notes_service_1 = require("./notes.service");
let NotesController = class NotesController {
    constructor(notesService, env) {
        this.notesService = notesService;
        this.env = env;
    }
    async getNotes() {
        return true;
    }
    async createNotes(user, newNotes) {
        return this.notesService.createNotes(newNotes);
        return {};
    }
};
__decorate([
    common_1.Get(''),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getNotes", null);
__decorate([
    common_1.Post(''),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __param(0, auth_user_decorator_1.AuthUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_schema_1.Users, create_note_dto_1.CreateNotesDto]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "createNotes", null);
NotesController = __decorate([
    common_1.Controller('/notes'),
    swagger_1.ApiTags('‍📝 Notes'),
    __metadata("design:paramtypes", [notes_service_1.NotesService,
        config_service_1.ConfigService])
], NotesController);
exports.NotesController = NotesController;
//# sourceMappingURL=notes.controller.js.map