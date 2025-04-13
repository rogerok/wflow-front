import { beforeEach } from 'vitest';

import { ThemeConstant } from '../../const';
import { ThemeStore } from './ThemeStore';

describe('ThemeStore test', () => {
  let themeStore: ThemeStore;

  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
      })),
    );
    themeStore = new ThemeStore();
  });

  it('should initialize theme from local storage if valid', () => {
    Object.defineProperty(window, 'matchMedia', {});
    expect(themeStore.current).toBe(ThemeConstant.Dark);
  });

  it('should return true if dark theme is on', () => {
    expect(themeStore.isDark).toBe(true);
  });

  it('should toggle theme to light', () => {
    themeStore.toggle();

    expect(themeStore.isDark).toBe(false);
    expect(themeStore.current).toBe(ThemeConstant.Light);
  });
});
