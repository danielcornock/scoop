import { IsNotEmpty } from 'class-validator';
import { emptyValidatorConfig } from 'src/common/constants/empty-validator-config.constant';

export class LoginRequest {
  @IsNotEmpty(emptyValidatorConfig)
  email: string;

  @IsNotEmpty(emptyValidatorConfig)
  password: string;
}
