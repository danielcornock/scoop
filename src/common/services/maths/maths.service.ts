export class MathsService {
  public static getPercentageDifference(
    newValue: number,
    oldValue: number
  ): number {
    const difference: number = newValue - oldValue;
    const percentageDifference = difference / oldValue;

    return Math.round(percentageDifference * 1000) / 1000;
  }
}
