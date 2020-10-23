import { BaseModel } from 'src/common/transfer-objects/base-model.dto';

export class LoginResponse extends BaseModel {
  email: string;
  jwt: string;
  name: string;
}
