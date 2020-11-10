import {
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { Dictionary, filter, startCase } from 'lodash';

import { Logging } from '../logging/logging.service';

export class DatabaseErrorsService {
  public static handle(dbError: IDatabaseError): void {
    if ('errors' in dbError) {
      this._handleMongoose(dbError);
    } else if ('code' in dbError) {
      this._handleMongo(dbError);
    } else {
      Logging.log(dbError);
      throw new InternalServerErrorException();
    }
  }

  private static _handleMongoose(mongooseError: IMongooseErrorContainer): void {
    const requiredErrors = filter(
      mongooseError.errors,
      (error: IMongooseError) => error.kind === 'required'
    ).map((error: IMongooseError) => error.path);

    if (requiredErrors.length) {
      throw new BadRequestException(
        `The following fields are required: ${startCase(
          requiredErrors.join(', ')
        )}.`
      );
    }
  }

  private static _handleMongo(mongoError: IMongoError): void {
    if (mongoError.code === 11000) {
      throw new BadRequestException(
        'An account with that email address already exists!'
      );
    }
  }
}

export interface IMongooseErrorContainer {
  errors: Dictionary<IMongooseError>;
}

export interface IMongooseError {
  kind: string;
  path: string;
  properties: { message: string };
}

export interface IMongoError {
  code: number;
}

export type IDatabaseError = IMongooseErrorContainer | IMongoError;
