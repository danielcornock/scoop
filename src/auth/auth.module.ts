import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from 'src/common/common.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { SettingsModule } from 'src/settings/settings.module';

import { AuthController } from './controllers/auth/auth.controller';
import { Token, TokenSchema } from './schemas/token.schema';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth/auth.service';

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
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
