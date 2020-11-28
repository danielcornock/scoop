export class DateInstance extends Date {
  constructor(value?: string) {
    super(value || Date.now());
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
}
