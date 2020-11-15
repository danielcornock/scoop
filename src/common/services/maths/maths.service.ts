export class MathsService {
  public static getPercentageDifference(
    newValue: number,
    oldValue: number
  ): number {
    const difference: number = newValue - oldValue;
    const percentageDifference = difference / oldValue;

    return Math.round(percentageDifference * 1000) / 1000;
  }

  public static daysToMilliseconds(days: number): number {
    const hours = days * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    const milliseconds = seconds * 1000;

    return milliseconds;
  }

  public static round2(val: number): number {
    return Math.round(val * 100) / 100;
  }

  public static round1(val: number): number {
    return Math.round(val * 10) / 10;
  }

  public static round0(val: number): number {
    return Math.round(val);
  }

  public static floor0(val: number): number {
    return Math.floor(val);
  }
}
