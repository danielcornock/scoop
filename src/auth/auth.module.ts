import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { SettingsModule } from 'src/settings/settings.module';

import { AuthController } from './controllers/auth/auth.controller';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [
    SettingsModule,
    NotificationsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
