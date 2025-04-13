import { describe } from 'vitest';
import { z } from 'zod';

import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../../lib/utils/localStorage';
import { UiBaseStore } from './UiBaseStore';

vi.mock('../../lib/utils/localStorage', () => ({
  getLocalStorageItem: vi.fn(),
  setLocalStorageItem: vi.fn(),
}));

describe('UiStore tests', () => {
  const fontSize = {
    increased: 'increased',
    default: 'default',
  } as const;
  const defaultState = fontSize.default;

  const fontSchema = z.nativeEnum(fontSize);
  const storageKey = 'font';
  type FontType = z.infer<typeof fontSchema>;

  it('should initialize the store with default params', () => {
    const store = new UiBaseStore<FontType>(
      defaultState,
      fontSchema,
      storageKey,
    );

    expect(store.currentState).toBe(defaultState);
  });

  it('should get from storage', () => {
    const store = new UiBaseStore<FontType>(
      defaultState,
      fontSchema,
      storageKey,
    );
    (getLocalStorageItem as ReturnType<typeof vi.fn>).mockReturnValue(
      defaultState,
    );

    store.setStateAndSaveToStorage(defaultState);

    const state = store.getStateFromStorage();

    expect(state).toBe(defaultState);
    expect(getLocalStorageItem).toBeCalled();
    expect(getLocalStorageItem).toHaveBeenCalledWith(storageKey);
  });

  it('should save to storage', () => {
    const store = new UiBaseStore<FontType>(
      defaultState,
      fontSchema,
      storageKey,
    );

    store.saveStateToStorage();

    expect(setLocalStorageItem).toBeCalledWith(storageKey, store.currentState);
  });

  it('should update storage correctly', () => {
    const store = new UiBaseStore<FontType>(
      defaultState,
      fontSchema,
      storageKey,
    );

    store.setState(fontSize.increased);

    expect(store.currentState).toBe(fontSize.increased);
  });

  it('should validate and return false', () => {
    const store = new UiBaseStore<FontType>(
      defaultState,
      fontSchema,
      storageKey,
    );

    const result = store.validateState('some invalid value');

    expect(result).toBe(false);
  });

  it('should validate and return true', () => {
    const store = new UiBaseStore<FontType>(
      defaultState,
      fontSchema,
      storageKey,
    );

    const result = store.validateState(fontSize.increased);

    expect(result).toBe(true);
  });
});
