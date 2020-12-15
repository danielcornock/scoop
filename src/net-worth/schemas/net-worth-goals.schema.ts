import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class NetWorthGoal {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ type: String })
  endDate?: string;

  @Prop({ required: true, type: Number })
  target: number;

  @Prop({ required: true, type: [String] })
  fields: Array<string>;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: Date })
  startDate?: string;

  @Prop({ required: true, type: Number })
  startingAmount: number;

  @Prop({ type: Boolean })
  isHidden?: boolean;

  @Prop({ type: Boolean })
  hasReceivedCongratulations?: boolean;

  @Prop({ type: Number })
  completedOn?: number;
}

export const NetWorthGoalsSchema = SchemaFactory.createForClass(
  NetWorthGoal
).index({
  user: 1
});

export type NetWorthGoalDocument = NetWorthGoal & Document;
