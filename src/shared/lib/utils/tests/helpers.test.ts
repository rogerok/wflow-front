import { describe } from 'vitest';

import { getLabel } from '../helpers';

describe('helper utils getLabel function', () => {
  it('should return label from string', () => {
    const label = 'some label';

    expect(getLabel(label)).toBe(label);
  });

  it('should return label from number', () => {
    const label = 2342525;

    expect(getLabel(label)).toBe(label);
  });

  it('should return undefined from array', () => {
    const label = [2342525];

    expect(getLabel(label)).toBe(undefined);
  });

  it('should return undefined from object', () => {
    const label = { key: 'value' };

    expect(getLabel(label)).toBe(undefined);
  });
});
