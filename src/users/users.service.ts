import {ConflictException, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './users.schema';
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private usersModel: Model<Users>,
  ) {}

  async getUserWithEmail(email: string): Promise<Users | undefined> {
    return this.usersModel.findOne({
      email
    });
  };

  /**
   * Create a user in database
   * @param {CreateUserDto} user that should be created
   */
  async signUp(user: CreateUserDto): Promise<Users> {
    const userExist = await this.getUserWithEmail(user.email);
    if (userExist) throw new ConflictException('user already exist');
    await this.usersModel.create({
      ...user
    });
    return this.getUserWithEmail(user.email);
  }

  /**
   * Check if user is stored in base
   * @param body
   */
  async login(body: {email: string, password: string}): Promise<Users> {
    const user = this.usersModel.findOne({

    });

    return user;
  }
}
