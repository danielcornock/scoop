import { IsArray } from 'class-validator';

export class UpdateSettings {
  @IsArray()
  netWorthFields: Array<string>;
}
