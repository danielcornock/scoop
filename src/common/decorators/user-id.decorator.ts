import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Types } from 'mongoose';

export const UserId = createParamDecorator(
  (_data, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return (request.user._id as Types.ObjectId).toHexString();
  }
);
