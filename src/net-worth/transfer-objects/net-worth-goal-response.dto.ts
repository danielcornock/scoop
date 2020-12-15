export class NetWorthGoalResponse {
  _id: string;
  endDate: string;
  target: number;
  current: number;
  fields: Array<string>;
  percentage: number;
  title: string;
  startDate: number;
  completed: boolean;
  hasReceivedCongratulations: boolean;
  completedOn: number;
}
