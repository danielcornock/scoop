import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
