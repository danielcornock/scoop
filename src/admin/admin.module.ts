import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

import { AdminController } from './controllers/admin/admin.controller';

@Module({
  imports: [AuthModule, NotificationsModule],
  controllers: [AdminController]
})
export class AdminModule {}
