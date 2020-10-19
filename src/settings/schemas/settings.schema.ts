import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { INetWorthSummaryItem } from '../interfaces/net-worth-summary-items.interface';

@Schema()
export class Settings extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ required: true })
  netWorthFields: string[];

  @Prop({ required: true })
  netWorthSummaryItems: INetWorthSummaryItem[];

  @Prop({ required: true })
  netWorthSummaryOptions: INetWorthSummaryItem[];
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
