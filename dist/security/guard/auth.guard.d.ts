import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../../users/auth.service';
import { UsersService } from '../../users/users.service';
export declare class AuthGuard implements CanActivate {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
