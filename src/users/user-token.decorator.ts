import { createParamDecorator } from '@nestjs/common';

/**
 * Param decorator to get the token stored in the Auhtorization header
 */
export const UserToken = createParamDecorator((data, ctx) => {
  try {
    const req = ctx.switchToHttp().getRequest();
    return req.headers.authorization;
  } catch (e) {
    return null;
  }
});