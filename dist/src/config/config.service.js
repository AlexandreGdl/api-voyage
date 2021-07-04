"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv = require("dotenv");
const fs = require("fs");
class ConfigService {
    constructor(filePath) {
        try {
            this.envConfig = dotenv.parse(fs.readFileSync(filePath));
        }
        catch (err) {
            this.envConfig = {};
        }
    }
    get(key) {
        return Object.keys(this.envConfig).length !== 0 ? this.envConfig[key] : process.env[key];
    }
    qualifiedMongoUri() {
        let uri;
        if (process.env.MONGO_URL) {
            uri = process.env.MONGO_URL;
        }
        else if (this.get('MONGO_URL')) {
            uri = this.get('MONGO_URL');
        }
        else if (this.get('db_user') && this.get('db_pass')) {
            uri = `mongodb://${this.get('db_user')}:${this.get('db_pass')}@${this.get('db_uri')}:${this.get('db_port')}/${this.get('db_name')}`;
        }
        else {
            uri = `mongodb://${this.get('db_uri')}:${this.get('db_port')}/${this.get('db_name')}`;
        }
        return uri;
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map