import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: IncomingMessage & {
      user: User;
    } = context.switchToHttp().getRequest();

    return !!request.user.isAdmin;
  }
}
