import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { html } from 'src/auth/templates/lib/html';
import {
  emailHost,
  emailPassword,
  emailPort,
  emailUsername,
  isProduction,
  sendgridPassword,
  sendgridUsername,
} from 'src/config/misc/env';

import { IEmailOptions } from './interfaces/email-options.interface';

@Injectable()
export class EmailService {
  private readonly _transporter: nodemailer.Transporter;

  constructor() {
    if (isProduction) {
      this._transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: sendgridUsername,
          pass: sendgridPassword
        }
      });
    } else {
      this._transporter = nodemailer.createTransport({
        host: emailHost,
        port: parseInt(emailPort),
        auth: {
          user: emailUsername,
          pass: emailPassword
        }
      });
    }
  }

  public async sendEmail(options: IEmailOptions): Promise<void> {
    const mailOptions = {
      from: 'Scoop <hello@scoopfinance.co.uk>',
      to: options.to,
      subject: options.subject,
      html: html(options.message)
    };

    await this._transporter.sendMail(mailOptions);
  }
}
