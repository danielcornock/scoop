import { Injectable } from '@nestjs/common';
import { first, last, range } from 'lodash';
import { DateInstance } from 'src/common/instances/date-instance';
import { ILabelValue } from 'src/common/interfaces/label-value.interface';
import { MathsService } from 'src/common/services/maths/maths.service';
import { NetWorthResponse } from 'src/net-worth/transfer-objects/net-worth-response.dto';

@Injectable()
export class NetWorthProjectionService {
  public getProjectedNetWorth(
    collection: NetWorthResponse[]
  ): Array<ILabelValue> {
    if (!collection?.length) {
      return null;
    }

    const last3Entries = this._getLast3Entries(collection);

    const amountToDivideBy = this._getAmountToDivideBy(
      last3Entries,
      collection.length
    );

    const last3MonthsAvgChange = this._getAverageChange(
      last3Entries,
      amountToDivideBy
    );

    const lastEntry = first(collection);
    const lastEntryDate = new DateInstance(lastEntry.date).toISOString();

    return range(0, 4).map((index) => {
      const newDate = new DateInstance(lastEntryDate);
      newDate.addMonths(index);
      const changeThisMonth = MathsService.round0(last3MonthsAvgChange * index);

      if (!amountToDivideBy) {
        return {
          value: first(last3Entries).total,
          label: newDate.getYearMonth()
        };
      }

      return {
        value: lastEntry.total + changeThisMonth,
        label: newDate.getYearMonth()
      };
    });
  }

  private _getLast3Entries(collection): Array<NetWorthResponse> {
    return collection.slice(0, 3);
  }

  private _getAmountToDivideBy(
    last3Entries: NetWorthResponse[],
    collectionLength: number
  ): number {
    let amountToDivideBy = last3Entries.length;

    if (collectionLength <= 3 && last(last3Entries).change === 0) {
      amountToDivideBy = collectionLength - 1;
    }

    return amountToDivideBy;
  }

  private _getAverageChange(
    last3Entries: NetWorthResponse[],
    dividedBy: number
  ): number {
    return (
      last3Entries.reduce((accum, { change }) => {
        return accum + change;
      }, 0) / dividedBy
    );
  }
}
