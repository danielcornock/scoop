import { IsNotEmpty } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
