import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserObj = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
