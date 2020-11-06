import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { toLower } from 'lodash';
import { Model } from 'mongoose';
import { IDecodedJwt } from 'src/auth/interfaces/jwt-config.interface';
import { User } from 'src/auth/schemas/user.schema';
import { CreateUserRequest } from 'src/auth/transfer-objects/create-user.dto';
import { DatabaseErrorsService } from 'src/common/services/database-errors/database-errors.service';
import { Maybe } from 'src/common/types/maybe';
import { jwtSecret } from 'src/config/misc/env';
import { promisify } from 'util';

@Injectable()
export class AuthService {
  @InjectModel(User.name)
  private readonly _userRepo: Model<User>;

  public async getFullUserByEmail(rawEmail: string): Promise<User> {
    const email = toLower(rawEmail);
    const user: Maybe<User> = await this._userRepo.findOne({ email });

    if (!user) {
      throw new NotFoundException(
        'No user found with matching email and password.'
      );
    }

    return user;
  }

  public async updateUserPassword(
    user: User,
    newPassword: string
  ): Promise<void> {
    user.password = await this._hashPassword(newPassword);
    user.passwordChangedAt = Date.now();

    await user.save();
  }

  public async getUserById(id: string): Promise<User> {
    const user: Maybe<User> = await this._userRepo.findById(id);

    if (!user) {
      throw new NotFoundException('This user no longer exists.');
    }

    return user;
  }

  public async createUser(userObject: CreateUserRequest): Promise<User> {
    try {
      const encryptedPassword: string = await this._hashPassword(
        userObject.password
      );
      const updatedUserObject: CreateUserRequest = {
        name: userObject.name,
        email: toLower(userObject.email),
        password: encryptedPassword
      };

      const createdUser: User = await this._userRepo.create(updatedUserObject);

      return createdUser;
    } catch (e) {
      DatabaseErrorsService.handle(e);
    }
  }

  public async checkPasswordMatch(
    testPassword: string,
    controlPassword: string
  ): Promise<void> {
    const isMatch: boolean = await compare(testPassword, controlPassword);

    if (!isMatch) {
      throw new NotFoundException(
        'No user found with matching email and password.'
      );
    }
  }

  public createJwt(user: User): string {
    return sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: !!user.isAdmin
      },
      jwtSecret,
      {
        expiresIn: '90d'
      }
    );
  }

  public decodeJwt(rawToken: string, secret: string): Promise<IDecodedJwt> {
    const bearerToken: Maybe<string> = this.getToken(rawToken);
    const jwtVerify = promisify<string, string, string>(verify);

    return (jwtVerify(bearerToken, secret) as unknown) as Promise<IDecodedJwt>;
  }

  public getToken(token: string): Maybe<string> {
    if (token && token.startsWith('Bearer')) {
      return token.split(' ')[1];
    } else {
      throw new UnauthorizedException('Invalid authentication token.');
    }
  }

  private _hashPassword(password: string, strength?: number): Promise<string> {
    return hash(password, strength || 10);
  }
}
