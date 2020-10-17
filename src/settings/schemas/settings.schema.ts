import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Settings extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ required: true })
  netWorthFields: string[];
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
