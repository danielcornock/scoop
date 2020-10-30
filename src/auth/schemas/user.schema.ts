import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ default: false, type: Boolean })
  isVerified?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
