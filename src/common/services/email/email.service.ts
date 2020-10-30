import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { emailHost, emailPassword, emailPort, emailUsername } from 'src/config/misc/env';

import { IEmailOptions } from './interfaces/email-options.interface';

@Injectable()
export class EmailService {
  private readonly _transporter: nodemailer.Transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      host: emailHost,
      port: parseInt(emailPort),
      auth: {
        user: emailUsername,
        pass: emailPassword
      }
    });
  }

  public async sendEmail(options: IEmailOptions): Promise<void> {
    const mailOptions = {
      from: 'Scoop <scoopfinance@gmail.com>',
      to: options.to,
      subject: options.subject,
      html: options.message
    };

    await this._transporter.sendMail(mailOptions);
  }
}
