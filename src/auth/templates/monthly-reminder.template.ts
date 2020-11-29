import { appUrl } from './lib/app-url';
import { buttonStyles } from './lib/button-styles';
import { linkStyles } from './lib/link-styles';

export function getMonthlyReminderTemplate(name: string): string {
  return `<p>Hi ${name.split(' ')[0]},</p>
<p>It's Scoop day! 💎</p>
<p>Just a friendly reminder that a month has passed, and it's time for you to update your logs.</p>
<p><a href="${appUrl('')}" ${buttonStyles()}>Go to application</a></p>
<p>If you don't want to receive these emails or want to change the date that you receive this reminder, you can head to the <a ${linkStyles()} href="${appUrl(
    'user-settings'
  )}"/>user settings page</a> and update your settings.</p>
<div>Best wishes,</div>
<div>The Scoop Team</div>
`;
}
