import { describe, expect, it } from 'vitest';

import { convertEmptyStringToNull } from '../converters';

describe('test convertEmptyStringToNull func', () => {
  it('should return null from empty string', () => {
    expect(convertEmptyStringToNull('')).toBe(null);
  });

  it('should return string', () => {
    const string = '123';
    expect(convertEmptyStringToNull(string)).toBe(string);
  });

  it('should return null from null', () => {
    expect(convertEmptyStringToNull(null)).toBe(null);
  });
});
