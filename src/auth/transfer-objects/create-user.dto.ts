import { IsBoolean, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { emptyValidatorConfig } from 'src/common/constants/empty-validator-config.constant';

export class CreateUserRequest {
  @IsNotEmpty(emptyValidatorConfig)
  name: string;

  @IsNotEmpty(emptyValidatorConfig)
  email: string;

  @IsNotEmpty(emptyValidatorConfig)
  @MaxLength(64)
  @MinLength(8)
  password: string;

  @IsBoolean()
  acceptPrivacyPolicy: boolean;
}
