import { beforeEach, describe, expect } from 'vitest';

import { setLocalStorageItem } from '../../lib';
import { ScreenStore } from '../screen/ScreenStore';
import { NavbarCollapsedConstant } from './constant';
import { NavbarStore } from './NavbarStore';

vi.mock('../../lib/utils/localStorage', () => ({
  getLocalStorageItem: vi.fn(() => NavbarCollapsedConstant.Expanded),
  setLocalStorageItem: vi.fn(),
}));

describe('NavbarStore tests', () => {
  let store: NavbarStore;

  beforeEach(() => {
    store = new NavbarStore(new ScreenStore());
  });

  it('should be expanded', () => {
    vi.stubGlobal('innerWidth', 1100);

    expect(store.isCollapsed).toBe(false);
  });

  it('should collapse navbar, if store smaller then md', () => {
    vi.stubGlobal('innerWidth', 400);

    store = new NavbarStore(new ScreenStore());

    expect(store.isCollapsed).toBe(true);
  });

  describe('toggling navbar', () => {
    it('should set to expanded', () => {
      store.toggle();

      expect(store.isCollapsed).toBe(false);
    });

    it('should set to collapsed', () => {
      store.toggle();
      store.toggle();
      expect(store.isCollapsed).toBe(true);
    });

    it('should save to localstorage if screen is upMd', () => {
      vi.stubGlobal('innerWidth', 950);

      store = new NavbarStore(new ScreenStore());

      store.toggle();
      expect(setLocalStorageItem).toHaveBeenCalled();
    });
  });

  it('should set collapsed', () => {
    store.close();

    expect(store.isCollapsed).toBe(true);
  });
});
