import { beforeEach, describe } from 'vitest';

import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from '../localStorage';

describe('localStorage utilities', () => {
  const mockedObj = {
    test: 'test',
  };
  const stringify = JSON.stringify(mockedObj);
  const key = 'testKey';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should retrieve items from localStorage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(stringify);

    const result = getLocalStorageItem(key);

    expect(result).toEqual(mockedObj);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should return null if localStorage item does not exists', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const result = getLocalStorageItem(key);

    expect(result).toBe(null);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should handle invalid json', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('{invalid json}');

    const result = getLocalStorageItem(key);

    expect(result).toBe(null);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should set localStorage item to localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    setLocalStorageItem(key, mockedObj);

    expect(setItemSpy).toHaveBeenCalledWith(key, stringify);
  });

  it('should handle errors when saving to localStorage', () => {
    const setItemSpy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('storage error');
      });

    expect(() => setLocalStorageItem(key, mockedObj)).not.toThrow();
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('should remove item from localStorage', () => {
    const removeSpyOn = vi.spyOn(Storage.prototype, 'removeItem');
    removeLocalStorageItem(key);

    expect(removeSpyOn).toHaveBeenCalledWith(key);
  });

  it('should handle error when removing from localStorage', () => {
    const removeSpyOn = vi
      .spyOn(Storage.prototype, 'removeItem')
      .mockImplementation(() => {
        throw new Error('storage error');
      });

    expect(() => removeLocalStorageItem(key)).not.toThrow();
    expect(removeSpyOn).toHaveBeenCalled();
  });
});
