/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const formatPrice = (amount: number, currency: string = 'GBP') => {
  const currencyMap: Record<string, { symbol: string, rate: number }> = {
    'GBP': { symbol: '£', rate: 1.0 },
    'USD': { symbol: '$', rate: 1.27 },
    'EUR': { symbol: '€', rate: 1.17 },
    'CAD': { symbol: 'CA$', rate: 1.73 },
    '£': { symbol: '£', rate: 1.0 },
    '$': { symbol: '$', rate: 1.27 },
    '€': { symbol: '€', rate: 1.17 }
  };

  const config = currencyMap[currency] || { symbol: currency, rate: 1.0 };
  const formattedAmount = (amount * config.rate).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Return symbol with a thin space for a premium editorial look
  return `${config.symbol}${formattedAmount}`;
};


export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};
