import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { html } from 'src/auth/templates/lib/html';
import { newsletter } from 'src/auth/templates/lib/newsletter';
import {
  emailHost,
  emailPassword,
  emailPort,
  emailUsername,
  isProduction,
  prodEmailPassword,
  prodEmailService,
  prodEmailUsername
} from 'src/config/misc/env';

import {
  IEmailMultiOptions,
  IEmailSingleOptions
} from './interfaces/email-options.interface';

@Injectable()
export class EmailService {
  private readonly _transporter: nodemailer.Transporter;

  constructor() {
    if (isProduction) {
      this._transporter = nodemailer.createTransport({
        service: prodEmailService,
        auth: {
          user: prodEmailUsername,
          pass: prodEmailPassword
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

  public async sendEmail(options: IEmailSingleOptions): Promise<void> {
    const mailOptions: Mail.Options = {
      from: 'Scoop <scoopfinanceuk@gmail.com>',
      to: options.to,
      subject: options.subject,
      html: html(options.message)
    };

    try {
      const email: nodemailer.SentMessageInfo = await this._transporter.sendMail(
        mailOptions
      );

      Logger.log(
        `Email successfully sent to ${email.accepted[0]}`,
        EmailService.name
      );
    } catch {
      Logger.error(
        'There was an issue when sending the email.',
        EmailService.name
      );
    }
  }

  public async sendBatchEmail(options: IEmailMultiOptions): Promise<void> {
    const promises = options.to.map((email) =>
      this.sendEmail({
        to: email,
        subject: options.subject,
        message: newsletter(options.message)
      })
    );

    await Promise.all(promises);
  }
}
