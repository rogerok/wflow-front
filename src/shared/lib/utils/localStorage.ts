export interface ILocalStorageService {
  getItem: (key: string) => unknown;
  setItem: <T>(key: string, value: T) => void;
}

export class LocalStorageService implements ILocalStorageService {
  getItem = (key: string): unknown => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  };

  setItem = <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error('Unable to save item to localStorage');
    }
  };
}

export const getLocalStorageItem = (key: string): unknown | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export const setLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('Unable to save item to localStorage');
  }
};

export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    console.error('Unable to remove item from localStorage');
  }
};
