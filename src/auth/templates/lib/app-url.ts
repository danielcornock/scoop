import { isProduction } from 'src/config/misc/env';

export function appUrl(extension: string): string {
  if (isProduction) {
    return `https://app.scoopfinance.co.uk/${extension}`;
  } else {
    return `http://localhost:4200/${extension}`;
  }
}
