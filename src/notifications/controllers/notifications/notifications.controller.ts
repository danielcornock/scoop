import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { Notification } from 'src/notifications/schemas/notifications.schema';
import { NotificationsService } from 'src/notifications/services/notifications/notifications.service';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
  constructor(private readonly _notificationsService: NotificationsService) {}

  @Get()
  public async getAll(@UserId() userId: string): HttpResponse<Notification[]> {
    const data = await this._notificationsService.getAllNotifications(userId);

    return { data };
  }

  @Delete(':notificationId')
  public deleteOne(
    @UserId() userId: string,
    @Param('notificationId') id: string
  ): HttpResponse<void> {
    return this._notificationsService.deleteNotification(id, userId);
  }
}
