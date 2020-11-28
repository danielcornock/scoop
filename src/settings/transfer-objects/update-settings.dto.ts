import { IsArray } from 'class-validator';
import { STUDENT_LOAN } from 'src/salary/constants/student-loan.enum';

import { INetWorthSummaryItemConfig } from '../interfaces/net-worth-summary-item-config.interface';

export class UpdateSettings {
  @IsArray()
  netWorthFields: Array<string>;

  @IsArray()
  netWorthSummaryItems: INetWorthSummaryItemConfig[];

  @IsArray()
  netWorthSummaryOptions: INetWorthSummaryItemConfig[];

  monthlyDistributionOutgoingFields: string[];

  salaryYearlySalary?: number;

  salaryStudentFinance?: STUDENT_LOAN;

  salaryPensionContribution?: number;

  salaryPensionBeforeTax?: boolean;

  salaryTaxCode?: string;
}
