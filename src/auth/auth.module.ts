import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { SettingsModule } from 'src/settings/settings.module';

import { AuthController } from './controllers/auth/auth.controller';
import { Token, TokenSchema } from './schemas/token.schema';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth/auth.service';
import { EmailVerificationService } from './services/email-verification/email-verification.service';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    SettingsModule,
    CommonModule,
    NotificationsModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema }
    ])
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, EmailVerificationService, UserService],
  exports: [AuthService]
})
export class AuthModule {}
