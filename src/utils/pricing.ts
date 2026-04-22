/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Calculates the price for a product based on its selected storage variant.
 * 
 * Logic:
 * - 1st step up: +15%
 * - 2nd step up: +10%
 * - 3rd step up and beyond: +5%
 * - THE HIGHEST (last) step is always forced to +5%
 */
export const calculateVariantPrice = (
  basePrice: number,
  storageVariants: string[] | undefined,
  selectedStorage: string | undefined
): number => {
  if (!storageVariants || storageVariants.length <= 1 || !selectedStorage) {
    return basePrice;
  }

  const selectedIndex = storageVariants.indexOf(selectedStorage);
  if (selectedIndex <= 0) {
    return basePrice;
  }

  let currentPrice = basePrice;
  
  // Calculate price step by step
  for (let i = 1; i <= selectedIndex; i++) {
    let increase = 0.05; // Default for 3rd step and beyond
    
    if (i === 1) {
      increase = 0.15;
    } else if (i === 2) {
      increase = 0.10;
    }
    
    // The highest step (last element in the array) should always be just 5%
    if (i === storageVariants.length - 1) {
      increase = 0.05;
    }
    
    currentPrice = currentPrice * (1 + increase);
  }

  return Math.round(currentPrice * 100) / 100; // Round to 2 decimal places
};
