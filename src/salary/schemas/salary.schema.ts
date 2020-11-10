import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Salary extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ required: true, immutable: true })
  date: string;

  @Prop({ required: true, type: Number })
  grossSalary: number;

  @Prop({ required: true, type: Number })
  incomeTax: number;

  @Prop({ required: true, type: Number })
  nationalInsurance: number;

  @Prop({ required: true, type: Number })
  studentLoanPayments: number;

  @Prop({ required: true, type: Number })
  pensionContributions: number;

  @Prop({ required: true, type: Number })
  netSalary: number;
}

export const SalarySchema = SchemaFactory.createForClass(Salary).index({
  date: 1,
  user: 1
});
