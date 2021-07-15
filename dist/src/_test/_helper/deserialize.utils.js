"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeBody = void 0;
const jsonapi_serializer_1 = require("jsonapi-serializer");
async function deserializeBody(body) {
    return new jsonapi_serializer_1.Deserializer({ keyForAttribute: 'camelCase' }).deserialize(body);
}
exports.deserializeBody = deserializeBody;
//# sourceMappingURL=deserialize.utils.js.map