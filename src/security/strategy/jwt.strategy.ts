import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { ConfigService } from '../../config/config.service';
import { Users } from '../../users/users.schema';
import { JwtPayload } from '../interface/jwt-payload.interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly env: ConfigService, @InjectModel('users') private readonly userModel: mongoose.Model<Users>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.get('jwt_secret'),
    });
  }

  /**
   * Automatically use for check if a user is valid before doing anything else
   * @param {any} payload the jwt payload
   * @return {Users | boolean} return the user if exist or false
   */
  async validate(payload: JwtPayload): Promise<Users | false> {

    const userExist = await this.userModel.aggregate([
      { $match: { _id: new ObjectId(payload._id) } },
      { $project: { password: 0 } },
    ]);

    return userExist.length > 0 ? userExist[0] : false;
  }
}
