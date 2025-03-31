import { ScreenStore } from './ScreenStore';

describe('ScreenStore test', () => {
  let store: ScreenStore;

  beforeEach(() => {
    store = new ScreenStore();
  });

  it('should initialize with correct window width', () => {
    expect(store.currentWidth).toBe(window.innerWidth);
  });

  it('should update on window resize', () => {
    vi.stubGlobal('innerWidth', 500);

    window.dispatchEvent(new Event('resize'));

    expect(store.currentWidth).toBe(500);
  });

  it('should update on window resize', () => {
    vi.stubGlobal('innerWidth', 500);

    window.dispatchEvent(new Event('resize'));

    expect(store.currentWidth).toBe(500);
  });

  it('should correct returns breakpoints state', () => {
    vi.stubGlobal('innerWidth', 800);

    window.dispatchEvent(new Event('resize'));

    expect(store.upXs).toBe(true);
    expect(store.upSm).toBe(true);
    expect(store.upMd).toBe(true);
    expect(store.upLg).toBe(false);
    expect(store.upXl).toBe(false);

    expect(store.downSm).toBe(false);
    expect(store.downMd).toBe(false);
    expect(store.downLg).toBe(true);
    expect(store.downXl).toBe(true);
  });
});
