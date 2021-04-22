import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.schema';
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private usersModel: Model<Users>,
  ) {}

  /**
   * Create a user in database
   * @param {CreateUserDto} user that should be created
   */
  async signUp(user: CreateUserDto): Promise<Users> {
    await this.usersModel.create({
      ...user
    });
    return this.usersModel.findOne({
      username: user.username
    });
  }

  /**
   * Check if user is stored in base
   * @param body
   */
  async login(body: {email: string, password: string}): Promise<Users> {
    const user = await this.usersModel.findOne({
      email: body.email,
      password: body.password
    });

    return user;
  }
}
