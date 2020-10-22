import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Investment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  totalInvested: number;

  @Prop({ required: true })
  totalValue: number;

  @Prop({ required: true })
  profit: number;

  @Prop({ required: true })
  profitPercentage: number;
}

export const InvestmentsSchema = SchemaFactory.createForClass(Investment);
