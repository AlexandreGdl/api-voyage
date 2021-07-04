import { Strategy } from 'passport-jwt';
import * as mongoose from 'mongoose';
import { ConfigService } from '../../config/config.service';
import { Users } from '../../users/users.schema';
import { JwtPayload } from '../interface/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly env;
    private readonly userModel;
    constructor(env: ConfigService, userModel: mongoose.Model<Users>);
    validate(payload: JwtPayload): Promise<Users | false>;
}
export {};
