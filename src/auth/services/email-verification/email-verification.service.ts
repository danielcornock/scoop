import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { Model, Types } from 'mongoose';
import { Token } from 'src/auth/schemas/token.schema';
import { User } from 'src/auth/schemas/user.schema';
import { getActivationTemplate } from 'src/auth/templates/activation.template';
import { EmailService } from 'src/common/services/email/email.service';
import { MathsService } from 'src/common/services/maths/maths.service';

@Injectable()
export class EmailVerificationService {
  @InjectModel(User.name)
  private readonly _userRepo: Model<User>;

  @InjectModel(Token.name)
  private readonly _tokenRepo: Model<Token>;

  constructor(private readonly _emailService: EmailService) {}

  public async verifyUser(userId: string): Promise<void> {
    await this._userRepo.findByIdAndUpdate(userId, {
      isVerified: true
    });
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

  public async resendConfirmationEmail(tokenString: string): Promise<void> {
    const token = await this._tokenRepo.findOne({ token: tokenString });
    const user = await this._userRepo.findById(token.user);

    this.sendActivationEmail(user);
  }

  private _createConfirmationToken(user: Types.ObjectId): Promise<Token> {
    return this._tokenRepo.create({
      user: user.toHexString(),
      token: crypto.randomBytes(16).toString('hex'),
      expiresAt: Date.now() + MathsService.daysToMilliseconds(0.5)
    });
  }

  public async checkIfVerified(user: User): Promise<void> {
    if (!user.isVerified) {
      throw new ForbiddenException(
        'This user account has not been activated yet.'
      );
    }
  }
}
