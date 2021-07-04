"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserToken = void 0;
const common_1 = require("@nestjs/common");
exports.UserToken = common_1.createParamDecorator((data, ctx) => {
    try {
        const req = ctx.switchToHttp().getRequest();
        return req.headers.authorization;
    }
    catch (e) {
        return null;
    }
});
//# sourceMappingURL=user-token.decorator.js.map