export class DateInstance extends Date {
  constructor(time: any) {
    super(time || Date.now());
  }

  public getRealMonth(): number {
    return super.getMonth() + 1;
  }

  public getDaysInMonth(): number {
    return new Date(this.getFullYear(), this.getRealMonth(), 0).getDate();
  }

  public isLastDayOfTheMonth(): boolean {
    const daysInCurrentMonth = this.getDaysInMonth();
    const currentDay = this.getDate();

    return currentDay === daysInCurrentMonth;
  }

  public getStringMonth(): string {
    const month = this.getRealMonth();

    return month < 10 ? `0${month}` : month.toString();
  }

  public getYearMonth(): string {
    const year = this.getFullYear();
    const month = this.getStringMonth();

    return `${year}-${month}`;
  }

  public getISODate(): string {
    return `${this.getYearMonth()}-${this.getDate()}`;
  }

  public addMonths(amount: number): number {
    return this.setMonth(this.getMonth() + amount);
  }
}
