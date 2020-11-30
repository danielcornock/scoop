import { Document } from 'mongoose';

export interface DatedUserDocument extends Document {
  date: string;
  user: string;
}
