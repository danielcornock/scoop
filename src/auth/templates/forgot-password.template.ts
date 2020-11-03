import { appUrl } from './lib/app-url';
import { buttonStyles } from './lib/button-styles';

export function getForgotPasswordTemplate(token: string, name: string): string {
  return `<p>Hi ${name.split(' ')[0]},</p>
<p>You recently requested to reset your password for your Scoop account.</p>

<p><a href="${appUrl(
    `resetPassword/${token}`
  )}" ${buttonStyles()}>Reset password here</a></p>

<p>If this wasn't you, feel free to ignore this email, or respond to it if you have any concerns.</p>

<p>Thanks,</p>
<p>The Scoop Team</p>
<br><br>
<p>If the link above doesn't work, try copying it directly in to your browser:</p>
<p>${appUrl(`resetPassword/${token}`)}</p>
`;
}
