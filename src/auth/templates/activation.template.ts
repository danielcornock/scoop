import { appUrl } from './lib/app-url';
import { buttonStyles } from './lib/button-styles';

export function getActivationTemplate(token: string, name: string): string {
  return `<p>Hi ${name.split(' ')[0]}, and welcome to Scoop!</p>

<p>You're receiving this email because you've tried to sign up for an account with Scoop. All you have to do now is click the link below to activate your account, and away we go!</p>
<p><a href="${appUrl(
    `confirmation/${token}`
  )}" ${buttonStyles()}>Activate account</a></p>
<p>If this wasn't you, feel free to disregard this email.</p>
<p>Best wishes,</p>
<p>The Scoop Team</p>

<br><br>
<p>If the link above doesn't work, try copying it directly in to your browser:</p>
<p>${appUrl(`confirmation/${token}`)}</p>`;
}
