import { appUrl } from './lib/app-url';

export function getActivationTemplate(token: string, name: string): string {
  return `<p>Hi ${name.split(' ')[0]}, and welcome to Scoop!</p>

<p>You're receiving this email because you've tried to sign up for an account with Scoop. All you have to do now is click the link below to activate your account, and away we go!</p>
<p><a href="${appUrl(`confirmation/${token}`)}">Click here to activate</a></p>
<p>If this wasn't you, feel free to disregard this email.</p>
<p>Best wishes,</p>

<p>Scoop</p>`;
}
