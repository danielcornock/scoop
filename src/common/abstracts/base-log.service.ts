import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';

import { DatedUserDocument } from '../interfaces/database-log-model.interface';

export abstract class BaseLogService<T extends DatedUserDocument> {
  constructor(protected readonly _repo: Model<T>) {}

  public async getOne(date: string, user: string): Promise<T> {
    const data = await this._repo.findOne({ user, date } as any);

    return data;
  }

  public async getAllSorted(user: string): Promise<T[]> {
    const data = await this._repo.find({ user } as any).sort({ date: 'desc' });

    return data;
  }

  public async update(
    date: string,
    data: Partial<T>,
    user: string
  ): Promise<T> {
    const newData = await this._repo.findOneAndUpdate(
      { date, user } as any,
      data,
      { new: true }
    );

    return newData;
  }

  public async deleteOne(date: string, user: string): Promise<void> {
    await this._repo.deleteOne({ user, date } as any);
  }

  public async removeAllAssociatedEntries(user: string): Promise<void> {
    await this._repo.deleteMany({ user } as any);
  }

  protected async _checkIfEntryForMonthExists(
    user: string,
    date: string
  ): Promise<void> {
    const foundEntry = await this._repo.findOne({
      user,
      date
    } as any);

    if (foundEntry) {
      throw new BadRequestException(
        'An entry already exists for that month. Please remove your original entry if you wish to overwite it.'
      );
    }
  }
}
