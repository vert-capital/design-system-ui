import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function camelToSnake(str?: string): string {
  if (!str) return '';
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function dateDisplay(
  date: string | Date | undefined,
  options: Intl.DateTimeFormatOptions = {},
  locale = 'pt-BR',
): string {
  try {
    if (date instanceof Date) date = date.toISOString();
    if (!date || typeof date !== 'string') return '';

    let _date;
    if (!date.includes('T')) {
      const arrDt = date.split('-');
      if (!arrDt || arrDt.length < 3) return '';
      _date = new Date(
        parseInt(arrDt[0]),
        parseInt(arrDt[1]) - 1,
        parseInt(arrDt[2]),
      );
    } else {
      _date = new Date(date);
    }

    const optionDefault: Intl.DateTimeFormatOptions = {};
    return new Intl.DateTimeFormat(locale, {
      ...optionDefault,
      ...options,
    }).format(_date);
  } catch (error) {
    return '';
  }
}

export type AmountDisplayProps = {
  locale?: string;
  currency?: string;
  showSymbol?: boolean;
  minimumFractionDigits?: number;
  style?: 'currency' | 'decimal' | 'percent' | 'unit';
  disableNegative?: boolean;
};

export function amountDisplay(
  amount: number | string | undefined,
  options: AmountDisplayProps = {},
): string {
  try {
    const currency = options?.currency || 'BRL';
    const locale = options?.locale || 'pt-BR';
    if (typeof amount === 'string') amount = parseFloat(amount);
    if (typeof amount !== 'number') return '';
    if (options.disableNegative) amount = Math.abs(amount);
    const value = new Intl.NumberFormat(locale, {
      style: options.style || 'currency',
      currency: currency,
      currencyDisplay: options?.showSymbol ? 'symbol' : 'code',
      minimumFractionDigits: options.minimumFractionDigits || 2,
    }).format(amount);
    if (value && !options?.showSymbol)
      return value.replace(currency, '').trim();

    return value;
  } catch (error) {
    return '';
  }
}

export function percentageDisplay(value?: number): string {
  if (value === undefined) return '';
  // Define the format options
  const formatOptions: Intl.NumberFormatOptions = {
    style: 'percent',
    maximumFractionDigits: 2,
  };

  // If the value is an integer, don't show decimal places
  if (Math.floor(value) === value) {
    formatOptions.maximumFractionDigits = 0;
  }

  // Create the formatter
  const formatter = new Intl.NumberFormat('pt-BR', formatOptions);

  // Format the number
  return formatter.format(value / 100); // Dividing by 100 to convert to percentage
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
