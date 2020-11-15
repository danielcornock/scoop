export interface GetProjectedSalaryConfig {
  remainingMonths: number;
  latestSalary: number;
  totalEarnedSoFar: number;
}

export interface GetRemainingTaxToBePaidConfig {
  remainingMonths: number;
  latestSalary: number;
  latestSalaryDate: string;
}

export interface GetProjectedTaxReturnConfig {
  totalEarnedSoFar: number;
  latestSalary: number;
  latestSalaryDate: string;
  taxAlreadyPaid: number;
}

export interface GetProjectedYearlyIncomeTaxConfig {
  remainingMonths: number;
  latestSalary: number;
  totalEarnedSoFar: number;
  latestSalaryDate: string;
}
