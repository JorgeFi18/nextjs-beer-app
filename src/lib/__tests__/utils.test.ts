import { formatCurrency } from '../utils';

describe('utils', () => {
  describe('formatCurrency', () => {
    it('formats number as IDR currency', () => {
      expect(formatCurrency(1000)).toBe('IDR 1,000');
      expect(formatCurrency(15500)).toBe('IDR 15,500');
      expect(formatCurrency(1234567.89)).toBe('IDR 1,234,567.89');
    });

    it('handles zero value', () => {
      expect(formatCurrency(0)).toBe('IDR 0');
    });

    it('handles negative values', () => {
      expect(formatCurrency(-1000)).toBe('IDR -1,000');
    });

    it('uses locale-specific formatting', () => {
      // This test assumes the toLocaleString is used, which formats according to the system locale
      const mockValue = 1000;
      const formatted = formatCurrency(mockValue);
      
      // Basic format check - should have IDR prefix and the number
      expect(formatted.startsWith('IDR ')).toBe(true);
      
      // The number part should be formatted
      const numberPart = formatted.replace('IDR ', '');
      expect(numberPart).not.toBe(mockValue.toString());
    });
  });
}); 