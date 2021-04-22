import { createParamDecorator } from '@nestjs/common';

/**
 * Param decorator to get the user in the request.
 * The route that use this decorator need to use the Auth guard.
 */
export const AuthUser = createParamDecorator(async (data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});