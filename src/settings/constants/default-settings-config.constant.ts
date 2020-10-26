export const defaultSettingsConfig = {
  netWorthFields: ['savings', 'investments'],
  netWorthSummaryItems: [
    { label: 'Savings', sumOf: ['savings'], icon: 'dollar-sign' },
    { label: 'Investments', sumOf: ['investments'], icon: 'trending-up' },
    { label: 'Change this month', sumOf: ['change'], icon: 'calendar' },
    { label: 'Net Worth', sumOf: ['total'], icon: 'user-plus' }
  ],
  netWorthSummaryOptions: [],
  monthlyDistributionIncomeFields: ['salary', 'balance carried'],
  monthlyDistributionOutgoingFields: ['rent', 'bills', 'savings', 'investments']
};
