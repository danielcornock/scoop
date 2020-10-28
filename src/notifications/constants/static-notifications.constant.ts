import { Dictionary } from 'lodash';

import { IStaticNotification } from '../interfaces/notification.interface';
import { STATIC_NOTIFICATION } from './static-notifications.enum';

export const staticNotificationsDictionary: Dictionary<IStaticNotification> = {
  [STATIC_NOTIFICATION.Welcome]: {
    name: 'welcome',
    title: 'Welcome!',
    text: 'Hi, and welcome to Scoop!'
  }
};
