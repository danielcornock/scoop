import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Token extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ type: String, required: true })
  token: string;

  @Prop({ type: Number, required: true })
  expiresAt: number;
}

export const TokenSchema = SchemaFactory.createForClass(Token).index({
  user: 1
});
