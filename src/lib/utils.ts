/**
 * Format a number as currency (IDR)
 */
export function formatCurrency(amount: number): string {
  return `IDR ${amount.toLocaleString()}`;
} 