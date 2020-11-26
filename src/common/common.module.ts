import { Module } from '@nestjs/common';

import { DateService } from './services/date/date.service';
import { EmailService } from './services/email/email.service';

@Module({
  providers: [EmailService, DateService],
  exports: [EmailService, DateService]
})
export class CommonModule {}
