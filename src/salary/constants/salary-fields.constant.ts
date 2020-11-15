import { Dictionary } from 'lodash';

export const salaryFields: Dictionary<string> = {
  date: 'Date',
  grossSalary: 'Gross salary',
  incomeTax: 'Income tax',
  nationalInsurance: 'National insurance',
  studentFinance: 'Student finance',
  pensionContributions: 'Pension',
  otherDeductions: 'Other',
  netSalary: 'Net salary'
};
