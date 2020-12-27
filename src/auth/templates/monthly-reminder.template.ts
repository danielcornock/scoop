import { appUrl } from './lib/app-url';
import { buttonStyles } from './lib/button-styles';
import { linkStyles } from './lib/link-styles';

export function getMonthlyReminderTemplate(name: string): string {
  return `<p>Hi, ${name.split(' ')[0]}! 👋</p>
<p>It's your personal Scoop day 💎</p>
<p>Just a friendly reminder that a month has passed, and now would be the perfect time for you to hop on and update your logs!</p>
<p>This month, we've been working on some cool new stuff for you. You can now create your own net worth goals! We've also made an assortment of small changes that will make your experience using the app just that little bit more pleasant.</p>
<p style="text-align: center"><a href="${appUrl(
    ''
  )}" ${buttonStyles()}>Go to application</a></p>
<p>As always, thanks for being a part of Scoop - let's take control of our finances together 💪</p>
<p>If you don't want to receive these emails or would like to change the date that you receive this reminder, you can head to the <a ${linkStyles()} href="${appUrl(
    'user-settings'
  )}"/>user settings page</a> and update your preferences.</p>
<div>Best wishes,</div>
<div>The Scoop Team</div>
`;
}
