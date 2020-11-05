import { appUrl } from './lib/app-url';
import { buttonStyles } from './lib/button-styles';

export function getActivationTemplate(token: string, name: string): string {
  return `<p>Hi ${name.split(' ')[0]}, and welcome to Scoop!</p>

<p>You're receiving this email because you've signed up for an account with Scoop. All you have to do now is click the link below to activate your account, and away we go!</p>
<p><a href="${appUrl(
    `confirmation/${token}`
  )}" ${buttonStyles()}>Activate account</a></p>
<p>If this wasn't you, feel free to disregard this email.</p>
<div>Best wishes,</div>
<div>The Scoop Team</div>

<br>
<div style="font-size: 14px">If the link above doesn't work, try copying it directly in to your browser:</div>
<div  style="font-size: 14px">${appUrl(`confirmation/${token}`)}</div>`;
}
