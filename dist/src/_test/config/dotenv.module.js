"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const options = process.env.NODE_ENV === 'github_action' ? '' : { path: `${__dirname}/.env.test` };
dotenv.config(options);
//# sourceMappingURL=dotenv.module.js.map