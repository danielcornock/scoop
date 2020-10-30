import { Body, Controller, Param, Post } from '@nestjs/common';
import { User } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { CreateUserRequest } from 'src/auth/transfer-objects/create-user.dto';
import { LoginRequest } from 'src/auth/transfer-objects/login-request.dto';
import { LoginResponse } from 'src/auth/transfer-objects/login-response.dto';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { STATIC_NOTIFICATION } from 'src/notifications/constants/static-notifications.enum';
import { NotificationsService } from 'src/notifications/services/notifications/notifications.service';
import { SettingsService } from 'src/settings/services/settings/settings.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _settingsService: SettingsService,
    private readonly _notificationsService: NotificationsService
  ) {}

  @Post('login')
  public async login(@Body() body: LoginRequest): HttpResponse<LoginResponse> {
    const user: User = await this._authService.getFullUserByEmail(body.email);

    await this._authService.checkPasswordMatch(body.password, user.password);
    await this._authService.checkIfVerified(user);

    const jwt: string = this._authService.createJwt(user);

    return {
      data: {
        _id: user.id,
        email: user.email,
        name: user.name,
        jwt
      }
    };
  }

  @Post('register')
  public async register(@Body() body: CreateUserRequest): Promise<void> {
    const user = await this._authService.createUser(body);

    await this._settingsService.createSettings(user._id);
    await this._authService.sendActivationEmail(user);
    await this._notificationsService.createStaticNotification(
      STATIC_NOTIFICATION.Welcome,
      user._id
    );
  }

  @Post('confirmation/:token')
  public async confirmAccount(@Param('token') token: string): Promise<void> {
    const tokenModel = await this._authService.isConfirmationTokenValid(token);

    await this._authService.verifyUser(tokenModel.user);
  }

  @Post('resend/:token')
  public async resendToken(@Param('token') token: string): Promise<void> {
    await this._authService.resendConfirmationEmail(token);
  }
}
