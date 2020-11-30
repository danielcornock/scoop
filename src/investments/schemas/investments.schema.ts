import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Investment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  totalValue: number;

  @Prop({ required: true })
  addedSinceLast: number;
}

export const InvestmentsSchema = SchemaFactory.createForClass(Investment).index(
  {
    user: 1
  }
);
