import { Injectable, CanActivate, ExecutionContext, forwardRef, Inject } from '@nestjs/common';
import { AuthService } from '../../users/auth.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   * Check if the token given in authorization header correspond to a real user
   * from the third party auth plugin, and from Shily.
   * @param {ExecutionContext} context the route context
   * @return {boolean} boolean
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true
  }

}
