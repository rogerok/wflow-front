import { UTCDate } from '@date-fns/utc';
import { describe, expect, it } from 'vitest';

import { formatDate } from '../dates';

describe('formatDate func', () => {
  it('should return date without time', () => {
    // Act
    const date = '2025-03-04T10:40:31Z';

    // Arrange
    const result = formatDate(date);

    // Assert
    expect(result).toBe('04.03.2025');
  });

  it('should return date with time', () => {
    const date = '2025-03-04T10:40:31Z';

    const result = formatDate(date, true);

    expect(result).toBe('04.03.2025 10:40');
  });

  it('should handle different time zones', () => {
    const date = '2025-12-15T23:59:59Z';

    const result = formatDate(date);

    expect(result).toBe('15.12.2025');
  });

  it('should handle UTCDate', () => {
    const date = new UTCDate('2024-07-01T08:30:00Z').toString();
    const result = formatDate(date);

    expect(result).toBe('01.07.2024');
  });

  it('should handle invalid date', () => {
    expect(() => formatDate('invalid-date')).toThrow();
  });
});
