import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as rateLimit from 'express-rate-limit';
import { CommonModule } from 'src/common/common.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { SettingsModule } from 'src/settings/settings.module';

import { AuthController } from './controllers/auth/auth.controller';
import { UserSettingsController } from './controllers/user-settings/user-settings.controller';
import { UserController } from './controllers/user/user.controller';
import { Token, TokenSchema } from './schemas/token.schema';
import { UserSettings, UserSettingsSchema } from './schemas/user-settings.schema';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth/auth.service';
import { EmailVerificationService } from './services/email-verification/email-verification.service';
import { UserSettingsService } from './services/user-settings/user-settings.service';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    SettingsModule,
    CommonModule,
    NotificationsModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
      { name: UserSettings.name, schema: UserSettingsSchema }
    ])
  ],
  controllers: [AuthController, UserController, UserSettingsController],
  providers: [
    AuthService,
    EmailVerificationService,
    UserService,
    UserSettingsService
  ],
  exports: [AuthService, UserService, UserSettingsService]
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        rateLimit({
          windowMs: 15 * 60 * 1000,
          max: 5,
          message: 'Too many unsuccessful login attempts'
        })
      )
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
