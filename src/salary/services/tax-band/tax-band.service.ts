import { Injectable } from '@nestjs/common';
import { taxBands } from 'src/salary/constants/tax-bands.constant';
import { TaxBands } from 'src/salary/interfaces/tax-band.interface';

@Injectable()
export class TaxBandService {
  public getTaxBands(date: string): TaxBands {
    const taxYearStart = this._getTaxYearStart(date);
    const bands: TaxBands = taxBands[taxYearStart];

    return bands;
  }

  private _getTaxYearStart(date: string): number {
    const dateObj = new Date(date);
    let year = dateObj.getFullYear();
    const currentMonth = dateObj.getMonth() + 1;

    if (currentMonth < 4) {
      year--;
    }

    return year;
  }
}
