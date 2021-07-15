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
  async login({email, password}: {email: string, password: string}): Promise<Users> {
    console.log(email)
    console.log(password)
    const user = this.usersModel.findOne({
      email: email.toLowerCase(),
      password
    });

    return user;
  }

  /**
   * Get user by id
   * @param body
   */
   async getUserWithId(id: string): Promise<Users> {
    return this.usersModel.findById(id, { password: 0 });
  }
}
