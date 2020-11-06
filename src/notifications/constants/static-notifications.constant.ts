import { Dictionary } from 'lodash';

import { IStaticNotification } from '../interfaces/notification.interface';
import { STATIC_NOTIFICATION } from './static-notifications.enum';

export const staticNotificationsDictionary: Dictionary<IStaticNotification> = {
  [STATIC_NOTIFICATION.Welcome]: {
    name: 'welcome',
    title: 'Welcome!',
    text: 'Hi, and welcome to Scoop!'
  },
  [STATIC_NOTIFICATION.MonthlyReminder]: {
    name: 'monthlyReminder',
    title: `It's that time of the month!`,
    text: `Just your monthly reminder to update your logs. If this day doesn't suit you, you can change it in your user settings.`
  }
};
