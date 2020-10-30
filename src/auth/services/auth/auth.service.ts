import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcryptjs';
import * as crypto from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { toLower } from 'lodash';
import { Model, Types } from 'mongoose';
import { IDecodedJwt } from 'src/auth/interfaces/jwt-config.interface';
import { Token } from 'src/auth/schemas/token.schema';
import { User } from 'src/auth/schemas/user.schema';
import { getActivationTemplate } from 'src/auth/templates/activation.template';
import { CreateUserRequest } from 'src/auth/transfer-objects/create-user.dto';
import { DatabaseErrorsService } from 'src/common/services/database-errors/database-errors.service';
import { EmailService } from 'src/common/services/email/email.service';
import { Maybe } from 'src/common/types/maybe';
import { jwtSecret } from 'src/config/misc/env';
import { promisify } from 'util';

@Injectable()
export class AuthService {
  @InjectModel(User.name)
  private readonly _userRepo: Model<User>;

  @InjectModel(Token.name)
  private readonly _tokenRepo: Model<Token>;

  constructor(private readonly _emailService: EmailService) {}

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

  public async checkIfVerified(user: User): Promise<void> {
    if (!user.isVerified) {
      throw new ForbiddenException(
        'This user account has not been activated yet.'
      );
    }
  }

  public async getUserById(id: string): Promise<User> {
    const user: Maybe<User> = await this._userRepo
      .findById(id)
      .select('-password');

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

  public async verifyUser(userId: string): Promise<void> {
    await this._userRepo.findByIdAndUpdate(userId, {
      isVerified: true
    });
  }

  public async resendConfirmationEmail(tokenString: string): Promise<void> {
    const token = await this._tokenRepo.findOne({ token: tokenString });
    const user = await this._userRepo.findById(token.user);

    this.sendActivationEmail(user);
  }

  public async isConfirmationTokenValid(token: string): Promise<Token> {
    const matchedToken = await this._tokenRepo.findOne({ token });

    if (!matchedToken) {
      throw new ForbiddenException('This token is not valid.');
    }

    if (matchedToken.expiresAt < Date.now()) {
      throw new ForbiddenException('Unfortunately this token has expired.');
    }

    return matchedToken;
  }

  public async sendActivationEmail(user: User): Promise<void> {
    const token = await this._createConfirmationToken(user._id);

    await this._emailService.sendEmail({
      to: user.email,
      subject: 'Welcome to Scoop! Just one more thing...',
      message: getActivationTemplate(token.token, user.name)
    });
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
        name: user.name
      },
      jwtSecret,
      {
        expiresIn: '90d'
      }
    );
  }

  public generateSecret(id: string, secret: string): string {
    return sign({ id }, secret);
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

  private _createConfirmationToken(user: Types.ObjectId): Promise<Token> {
    return this._tokenRepo.create({
      user: (user as Types.ObjectId).toHexString(),
      token: crypto.randomBytes(16).toString('hex'),
      expiresAt: Date.now() + this._daysToMilliseconds(0.5)
    });
  }

  private _daysToMilliseconds(days: number): number {
    const hours = days * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    const milliseconds = seconds * 1000;

    return milliseconds;
  }
}
