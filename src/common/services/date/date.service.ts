import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  public getDaysInCurrentMonth(): number {
    const now = new Date();

    return this.getDaysInMonth(now);
  }

  public getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  public isLastDayOfTheMonth(): boolean {
    const daysInCurrentMonth = this.getDaysInCurrentMonth();
    const currentDate = this.getCurrentDay();

    return currentDate === daysInCurrentMonth;
  }

  public getCurrentDay(): number {
    const date = new Date(Date.now());
    return date.getDate();
  }
}
