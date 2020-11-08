import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { INetWorthCustomValues } from '../interfaces/net-worth-log.interface';

@Schema()
export class NetWorth extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop()
  customValues: INetWorthCustomValues;

  @Prop({ required: true, immutable: true })
  date: string;

  @Prop({ required: true })
  total: number;
}

export const NetWorthSchema = SchemaFactory.createForClass(NetWorth).index({
  date: 1,
  user: 1
});
