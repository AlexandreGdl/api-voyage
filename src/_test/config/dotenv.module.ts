import * as dotenv from 'dotenv';

const options = process.env.NODE_ENV === 'github_action' ? '' : { path: `${__dirname}/.env.test` };
dotenv.config(options as dotenv.DotenvConfigOptions);
