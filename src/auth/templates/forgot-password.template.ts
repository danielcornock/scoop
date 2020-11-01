import { appUrl } from './lib/app-url';

export function getForgotPasswordTemplate(token: string, name: string): string {
  return `<p>Hi ${name},</p>
<p>You recently requested to reset your password for your Scoop account.</p>

<p><a href="${appUrl(
    `resetPassword/${token}`
  )}">Click here to reset your password.</a></p>

<p>If this wasn't you, feel free to ignore this email, or respond to it if you have any concerns.</p>

<p>Thanks,</p>
<p>The Scoop Team</p>
`;
}
