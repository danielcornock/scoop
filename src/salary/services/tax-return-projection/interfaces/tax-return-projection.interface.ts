export interface GetProjectedSalaryConfig {
  remainingMonths: number;
  latestSalary: number;
  totalEarnedSoFar: number;
}

export interface GetRemainingTaxToBePaidConfig {
  remainingMonths: number;
  latestSalary: number;
  latestSalaryDate: string;
  taxCode: string;
}

export interface GetProjectedTaxReturnConfig {
  totalEarnedSoFar: number;
  latestSalary: number;
  latestSalaryDate: string;
  taxAlreadyPaid: number;
  taxCode: string;
}

export interface GetProjectedYearlyIncomeTaxConfig {
  remainingMonths: number;
  latestSalary: number;
  totalEarnedSoFar: number;
  latestSalaryDate: string;
  taxCode: string;
}
