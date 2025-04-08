import { renderHook } from '@testing-library/react';
import { beforeEach } from 'vitest';

import { useKeyDown } from '../useKeyDown';

describe('useKeydownHook test', () => {
  let mockedCallback = vi.fn();
  const keyCode = 'Enter';

  beforeEach(() => {
    mockedCallback = vi.fn();
  });

  it('should work when correct key pressed', () => {
    const mockedCallback = vi.fn();
    const keyCode = 'Enter';

    renderHook(() =>
      useKeyDown({
        callBack: mockedCallback,
        keyCode: keyCode,
      }),
    );

    const event = new KeyboardEvent('keydown', { code: keyCode });

    window.dispatchEvent(event);

    expect(mockedCallback).toBeCalled();
  });

  it('should not work when different key pressed', () => {
    const mockedCallback = vi.fn();
    const keyCode = 'Enter';

    renderHook(() =>
      useKeyDown({
        callBack: mockedCallback,
        keyCode: keyCode,
      }),
    );

    const event = new KeyboardEvent('keydown', { code: 'Escape' });

    window.dispatchEvent(event);

    expect(mockedCallback).not.toBeCalled();
  });

  it('should cleanup event listener on unmount', () => {
    const { unmount } = renderHook(() =>
      useKeyDown({
        callBack: mockedCallback,
        keyCode: keyCode,
      }),
    );

    unmount();
    const event = new KeyboardEvent('keydown', { code: keyCode });
    window.dispatchEvent(event);

    expect(mockedCallback).not.toHaveBeenCalled();
  });
});
