import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UserService {
  @InjectModel(User.name)
  private readonly _userRepo: Model<User>;

  public async getAll(): Promise<Partial<User>[]> {
    const data = await this._userRepo.find();

    return data.map((user) => {
      return {
        email: user.email,
        name: user.name,
        _id: user._id,
        lastOnline: user.lastOnline,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified
      };
    });
  }

  public async deleteOne(id: string): Promise<void> {
    await this._userRepo.findByIdAndDelete(id);
  }

  public async markLastOnline(user: string): Promise<void> {
    await this._userRepo.findByIdAndUpdate(user, {
      lastOnline: Date.now()
    });
  }
}
