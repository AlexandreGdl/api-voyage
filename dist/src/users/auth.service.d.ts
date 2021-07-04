import 'isomorphic-fetch';
import { Model } from 'mongoose';
import { ConfigService } from '../config/config.service';
import { Users } from './users.schema';
export declare class AuthService {
    private readonly configService;
    private usersModel;
    constructor(configService: ConfigService, usersModel: Model<Users>);
}
