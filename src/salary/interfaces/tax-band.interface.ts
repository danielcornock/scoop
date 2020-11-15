export interface TaxBand {
  min: number;
  max: number;
  percentage: number;
}

export type TaxBands = Array<TaxBand>;
