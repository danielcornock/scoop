import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MaxLength(64)
  @MinLength(8)
  password: string;
}
