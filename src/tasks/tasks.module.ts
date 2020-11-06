import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

import { TasksService } from './services/tasks/tasks.service';

@Module({
  providers: [TasksService],
  imports: [
    AuthModule,
    NotificationsModule,
    CommonModule,
    ScheduleModule.forRoot()
  ]
})
export class TasksModule {}
