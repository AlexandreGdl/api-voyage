import { Model } from 'mongoose';
import { Users } from './users.schema';
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersService {
    private usersModel;
    constructor(usersModel: Model<Users>);
    getUserWithEmail(email: string): Promise<Users | undefined>;
    signUp(user: CreateUserDto): Promise<Users>;
    login({ email, password }: {
        email: string;
        password: string;
    }): Promise<Users>;
    getUserWithId(id: string): Promise<Users>;
}
