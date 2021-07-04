import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersController {
    protected readonly userService: UsersService;
    protected readonly authService: AuthService;
    protected readonly env: ConfigService;
    private readonly jwtService;
    private readonly bcryptSalt;
    constructor(userService: UsersService, authService: AuthService, env: ConfigService, jwtService: JwtService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    signup(newUser: CreateUserDto): Promise<{
        token: string;
    }>;
    getUserById(id: any): Promise<import("./users.schema").Users>;
}
