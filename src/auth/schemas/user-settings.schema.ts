import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class UserSettings extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ type: Boolean, default: true })
  enableInvestments?: string;

  @Prop({ type: Boolean, default: true })
  enableNetWorth?: string;

  @Prop({ type: Boolean, default: true })
  enableMonthlyDistribution?: string;

  @Prop({ type: String, default: '£' })
  preferredCurrency?: string;

  @Prop({ type: Boolean, default: true })
  enableEmailNotifications?: boolean;

  @Prop({ type: String, default: '01' })
  reminderDate?: string;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
