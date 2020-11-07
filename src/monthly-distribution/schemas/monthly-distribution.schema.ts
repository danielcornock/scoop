import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Dictionary } from 'lodash';
import { Document, Types } from 'mongoose';

@Schema()
export class MonthlyDistribution extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop()
  date: string;

  @Prop()
  income: Dictionary<number>;

  @Prop()
  outgoing: Dictionary<number>;

  @Prop()
  remaining: number;
}

export const MonthlyDistributionSchema = SchemaFactory.createForClass(
  MonthlyDistribution
).index({
  user: 1
});
