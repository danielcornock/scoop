import { IsString } from 'class-validator';

export class ChangePasswordRequest {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
