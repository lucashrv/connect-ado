/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface User {
  id: string;
  email: string;
  role: 'INSTITUTION' | 'ADOPTER' | 'CHILD';
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const requestUser: User = ctx.switchToHttp().getRequest().user;
    return requestUser;
  },
);
