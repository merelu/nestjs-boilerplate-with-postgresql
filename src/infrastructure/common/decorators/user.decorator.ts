import { UserM } from '@domain/model/user';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: UserM = request.user;

    return data ? user?.[data] : user;
  },
);
