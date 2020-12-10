import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateInstance } from 'src/common/instances/date-instance';
import {
  NetWorthGoal,
  NetWorthGoalDocument
} from 'src/net-worth/schemas/net-worth-goals.schema';
import { CreateNetWorthGoalRequest } from 'src/net-worth/transfer-objects/net-worth-goal-create.dto';
import { NetWorthGoalResponse } from 'src/net-worth/transfer-objects/net-worth-goal-response.dto';
import { NetWorthResponse } from 'src/net-worth/transfer-objects/net-worth-response.dto';

@Injectable()
export class NetWorthGoalsService {
  constructor(
    @InjectModel(NetWorthGoal.name)
    private readonly _netWorthGoalsRepo: Model<NetWorthGoalDocument>
  ) {}

  public async createGoal(
    goal: CreateNetWorthGoalRequest,
    user: string,
    lastEntry: NetWorthResponse
  ): Promise<NetWorthGoal> {
    const startingAmount =
      goal.goalType === '0' ? 0 : this._getSumOfFields(lastEntry, goal.fields);

    if (startingAmount > goal.target) {
      throw new BadRequestException(
        'Your target cannot be less than than your starting amount.'
      );
    }

    const startDate =
      goal.goalType === '0' ? null : new DateInstance(Date.now()).getISODate();

    const data = await this._netWorthGoalsRepo.create({
      startDate,
      endDate: goal.endDate,
      startingAmount,
      target: goal.target,
      fields: goal.fields,
      title: goal.title,
      user
    });

    return data;
  }

  public async getGoals(
    user: string,
    latestNetWorth: NetWorthResponse
  ): Promise<NetWorthGoalResponse[]> {
    const [goals] = await Promise.all([
      this._netWorthGoalsRepo.find({ user }).sort({ date: 'asc' })
    ]);

    if (!goals || !latestNetWorth) {
      return null;
    }

    return goals.map((goal) => {
      const current = this._getSumOfFields(latestNetWorth, goal.fields);
      const percentage =
        (current - goal.startingAmount) / (goal.target - goal.startingAmount);

      return {
        ...goal.toObject(),
        current,
        percentage: Math.min(percentage, 1),
        completed: current >= goal.target
      };
    });
  }

  public async deleteOne(user: string, _id: string): Promise<void> {
    await this._netWorthGoalsRepo.deleteOne({ user, _id });
  }

  private _getSumOfFields(
    netWorth: NetWorthResponse,
    fields: Array<string>
  ): number {
    return fields.reduce((accum, field) => {
      return accum + (netWorth[field] || netWorth.customValues[field] || 0);
    }, 0);
  }
}
