import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UserService {
  @InjectModel(User.name)
  private readonly _userRepo: Model<User>;

  public async getAll(): Promise<User[]> {
    const data = await this._userRepo.find();

    return data;
  }

  public async deleteOne(id: string): Promise<void> {
    await this._userRepo.findByIdAndDelete(id);
  }
}
