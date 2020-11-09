import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';
import { User } from 'src/auth/schemas/user.schema';
import { EmailVerificationService } from 'src/auth/services/email-verification/email-verification.service';
import { UserSettingsService } from 'src/auth/services/user-settings/user-settings.service';
import { UserService } from 'src/auth/services/user/user.service';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { HttpResponse } from 'src/common/interfaces/http-response.interface';
import { InvestmentsService } from 'src/investments/services/investments/investments.service';
import { MonthlyDistributionService } from 'src/monthly-distribution/services/monthly-distribution/monthly-distribution.service';
import { NetWorthService } from 'src/net-worth/services/net-worth/net-worth.service';
import { Notification } from 'src/notifications/schemas/notifications.schema';
import { NotificationsService } from 'src/notifications/services/notifications/notifications.service';
import { CreateCustomNotification } from 'src/notifications/transfer-objects/create-custom-notification.dto';
import { SettingsService } from 'src/settings/services/settings/settings.service';

@Controller('admin')
@UseGuards(AuthGuard, AdminGuard)
export class AdminController {
  constructor(
    private readonly _notificationsService: NotificationsService,
    private readonly _userService: UserService,
    private readonly _emailVerificationService: EmailVerificationService,
    private readonly _netWorthService: NetWorthService,
    private readonly _investmentsService: InvestmentsService,
    private readonly _monthlyDistributionService: MonthlyDistributionService,
    private readonly _userSettingsService: UserSettingsService,
    private readonly _settingsService: SettingsService
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

  @Get('users')
  public async getAll(): HttpResponse<Partial<User>[]> {
    const data = await this._userService.getAll();

    return { data };
  }

  @Delete('users/:userId')
  public async deleteUserAndAllDocuments(
    @Param('userId') userId: string,
    @UserId() self: string
  ): Promise<void> {
    if (userId === self) {
      throw new ForbiddenException('You cannot remove yourself as a user.');
    }

    await this._userService.deleteOne(userId);

    await Promise.all([
      this._emailVerificationService.removeAllAssociatedTokens(userId),
      this._settingsService.deleteSettings(userId),
      this._userSettingsService.deleteSettings(userId),
      this._netWorthService.removeAllAssociatedEntries(userId),
      this._investmentsService.removeAllAssociatedEntries(userId),
      this._monthlyDistributionService.removeAllAssociatedEntries(userId),
      this._notificationsService.removeAllAssociatedEntries(userId)
    ]);
  }
}
