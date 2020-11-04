import { IsString } from 'class-validator';

import { IStaticNotification } from '../interfaces/notification.interface';

export class CreateCustomNotification implements IStaticNotification {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  text: string;
}
