import { addCustomStyles } from './add-custom-styles';
import { appUrl } from './app-url';
import { linkStyles } from './link-styles';

export function newsletter(content: string): string {
  return `${addCustomStyles(content)}
<div style="margin-top: 40px">As always, thank you for using our service!</div>
<div>The Scoop Team</div>
<br>
<p style="font-size: 12px;">If you no longer want to receive newsletters or monthly reminders from us, you can do so by unsubscribing <a ${linkStyles()} href="${appUrl(
    'user-settings'
  )}">here</a>.</p>`;
}
