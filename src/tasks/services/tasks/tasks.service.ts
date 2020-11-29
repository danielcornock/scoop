import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { IEmailUserDetails } from 'src/auth/services/user-settings/interfaces/user-notifications-list.interface';
import { UserSettingsService } from 'src/auth/services/user-settings/user-settings.service';
import { getMonthlyReminderTemplate } from 'src/auth/templates/monthly-reminder.template';
import { EmailService } from 'src/common/services/email/email.service';
import { STATIC_NOTIFICATION } from 'src/notifications/constants/static-notifications.enum';
import { NotificationsService } from 'src/notifications/services/notifications/notifications.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly _userSettingsService: UserSettingsService,
    private readonly _notificationsService: NotificationsService,
    private readonly _emailService: EmailService
  ) {}

  /*
    Cron job scheduled to run every day at 9am that sends a monthly log reminder if
    the current date matches the date specified in the user settings
  */
  @Cron('0 0 8 * * *')
  public async sendLogReminder() {
    Logger.log('Checking for log reminders', AuthService.name);

    const {
      userIdsForAppNotification,
      userEmailsForEmailNotification
    } = await this._userSettingsService.getUsersWithNotificationForToday();

    await this._notificationsService.createStaticMultiNotification(
      STATIC_NOTIFICATION.MonthlyReminder,
      userIdsForAppNotification
    );

    Logger.log('Notifications have been sent.', AuthService.name);

    const allEmailPromises: Array<Promise<
      void
    >> = userEmailsForEmailNotification.map((details: IEmailUserDetails) =>
      this._emailService.sendEmail({
        to: details.email,
        subject: `It's time for you to update your logs! 🚀`,
        message: getMonthlyReminderTemplate(details.name)
      })
    );

    await Promise.all(allEmailPromises);

    Logger.log('Email notifications have been sent.', AuthService.name);
  }
}
