import { appUrl } from './lib/app-url';
import { buttonStyles } from './lib/button-styles';

export function getForgotPasswordTemplate(token: string, name: string): string {
  return `<p>Hi ${name.split(' ')[0]},</p>
<p>You recently requested to reset the password for your Scoop account.</p>

<p><a href="${appUrl(
    `resetPassword/${token}`
  )}" ${buttonStyles()}>Reset password here</a></p>

<p>If this wasn't you, feel free to ignore this email, or respond to it if you have any concerns.</p>

<div>Thanks,</div>
<div>The Scoop Team</div>
<br>
<div style="font-size: 14px">If the link above doesn't work, try copying it directly in to your browser:</div>
<div style="font-size: 14px">${appUrl(`resetPassword/${token}`)}</div>
`;
}
