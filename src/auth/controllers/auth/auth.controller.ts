import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { CreateUserRequest } from 'src/auth/transfer-objects/create-user.dto';
import { LoginRequest } from 'src/auth/transfer-objects/login-request.dto';
import { LoginResponse } from 'src/auth/transfer-objects/login-response.dto';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { jwtSecret } from 'src/config/misc/env';
import { SettingsService } from 'src/settings/services/settings/settings.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _settingsService: SettingsService,
  ) {}

  @Post('login')
  public async login(@Body() body: LoginRequest): HttpResponse<LoginResponse> {
    const user: User = await this._authService.getFullUserByEmail(body.email);

    if (
      !(await this._authService.isPasswordMatch(body.password, user.password))
    ) {
      throw new UnauthorizedException('The password provided does not match.');
    }

    const jwt: string = this._authService.generateJwt({
      payload: {
        id: user._id,
        email: user.email,
      },
      secret: jwtSecret,
      expiresIn: '90d',
    });

    return {
      data: {
        email: user.email,
        name: user.name,
        jwt,
      },
    };
  }

  @Post('register')
  public async register(
    @Body() body: CreateUserRequest,
  ): HttpResponse<LoginResponse> {
    const user = await this._authService.createUser(body);
    await this._settingsService.createSettings(user._id);

    const jwt: string = this._authService.generateJwt({
      payload: {
        id: user._id,
        email: user.email,
      },
      secret: jwtSecret,
      expiresIn: '90d',
    });

    return {
      data: {
        email: user.email,
        name: user.name,
        jwt,
      },
    };
  }
}
