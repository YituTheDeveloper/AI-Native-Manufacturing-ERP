// Ethiopian Locale & Currency Utilities
// Ethiopian Birr (ETB) — ISO 4217 code

export const CURRENCY_CODE = 'ETB';
export const CURRENCY_SYMBOL = 'ETB';
export const CURRENCY_LOCALE = 'am-ET'; // Amharic — Ethiopia

/** Format a number as Ethiopian Birr */
export function formatBirr(amount: number): string {
  return `ETB ${amount.toLocaleString('en-ET', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Format a compact Birr amount (e.g. ETB 618,000) with no decimals */
export function formatBirrCompact(amount: number): string {
  return `ETB ${amount.toLocaleString('en-ET')}`;
}

/** Ethiopian business regions */
export const ET_REGIONS = [
  'Addis Ababa',
  'Oromia',
  'Amhara',
  'Tigray',
  'SNNPR',
  'Sidama',
  'Dire Dawa',
  'Harari',
  'Somali',
  'Afar',
  'Benishangul-Gumuz',
];

/** Ethiopian payment terms (in Amharic/English context) */
export const ET_PAYMENT_TERMS = ['NET30', 'NET15', 'NET60', 'COD', 'EOM'];
