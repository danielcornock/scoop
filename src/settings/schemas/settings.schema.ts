import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { STUDENT_LOAN } from 'src/salary/constants/student-loan.enum';

import { INetWorthSummaryItemConfig } from '../interfaces/net-worth-summary-item-config.interface';

@Schema()
export class Settings extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ required: true })
  netWorthFields: string[];

  @Prop({ required: true })
  netWorthSummaryItems: INetWorthSummaryItemConfig[];

  @Prop({ required: true })
  netWorthSummaryOptions: INetWorthSummaryItemConfig[];

  @Prop({ required: true })
  monthlyDistributionIncomeFields: string[];

  @Prop({ required: true })
  monthlyDistributionOutgoingFields: string[];

  @Prop()
  salaryYearlySalary?: number;

  @Prop({ enum: [STUDENT_LOAN.Pre2012, STUDENT_LOAN.Post2012] })
  salaryStudentFinance?: STUDENT_LOAN | undefined;

  @Prop({ default: 0 })
  salaryPensionContribution?: number;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings).index({
  user: 1
});
