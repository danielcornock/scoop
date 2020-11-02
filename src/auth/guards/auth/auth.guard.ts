import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { IDecodedJwt } from 'src/auth/interfaces/jwt-config.interface';
import { User } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { jwtSecret } from 'src/config/misc/env';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _authService: AuthService) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IncomingMessage & {
      user: User;
    } = context.switchToHttp().getRequest();
    const decodedJwt: IDecodedJwt = await this._getDecodedJwt(
      request.headers.authorization
    );

    request.user = await this._authService.getUserById(decodedJwt.id);

    this._checkPasswordNotChanged(request.user, decodedJwt);

    return true;
  }

  private async _getDecodedJwt(token: string): Promise<IDecodedJwt> {
    try {
      const decodedJwt: IDecodedJwt = await this._authService.decodeJwt(
        token,
        jwtSecret
      );
      return decodedJwt;
    } catch (e) {
      throw new UnauthorizedException(
        'Unfortunately your session has expired. Please log in again.'
      );
    }
  }

  private _checkPasswordNotChanged(user: User, jwt: IDecodedJwt): void {
    /* Jwt time is stored in seconds */
    const jwtCreation = (jwt.iat + 1) * 1000;

    if (user.passwordChangedAt && user.passwordChangedAt > jwtCreation) {
      throw new UnauthorizedException(
        'Unfortunately your session has expired. Please log in again.'
      );
    }
  }
}
