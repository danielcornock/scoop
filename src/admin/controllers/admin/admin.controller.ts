import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { UserService } from 'src/auth/services/user/user.service';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { Notification } from 'src/notifications/schemas/notifications.schema';
import { NotificationsService } from 'src/notifications/services/notifications/notifications.service';
import { CreateCustomNotification } from 'src/notifications/transfer-objects/create-custom-notification.dto';

@Controller('admin')
@UseGuards(AuthGuard, AdminGuard)
export class AdminController {
  constructor(
    private readonly _notificationsService: NotificationsService,
    private readonly _userService: UserService
  ) {}

  @Post('notifications/global')
  public async sendNotifications(
    @Body() body: CreateCustomNotification
  ): HttpResponse<Notification[]> {
    const users = await this._userService.getAll();
    const userIds = users.map((user) => user._id.toHexString());
    const data = await this._notificationsService.createCustomMultiNotification(
      body,
      userIds
    );

    return { data };
  }
}
