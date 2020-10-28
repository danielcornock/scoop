import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { NotificationsController } from './controllers/notifications/notifications.controller';
import {
  Notification,
  NotificationsSchema
} from './schemas/notifications.schema';
import { NotificationsService } from './services/notifications/notifications.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationsSchema
      }
    ])
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController],
  exports: [NotificationsService]
})
export class NotificationsModule {}
