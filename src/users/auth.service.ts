import { Injectable } from '@nestjs/common';
import 'isomorphic-fetch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '../config/config.service';
import { Users } from './users.schema';

// eslint-disable-next-line import/order
import bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

  constructor(
    private readonly configService: ConfigService,
    @InjectModel('users') private usersModel: Model<Users>,
  ) {}
}

