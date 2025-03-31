import { renderHook } from '@testing-library/react';
import { beforeEach, describe } from 'vitest';

import { usePopup } from '../usePopup';

describe('usePopupHook tests', () => {
  let onClose = vi.fn();

  beforeEach(() => {
    onClose = vi.fn();
  });

  it('should close on escape event', () => {
    renderHook(() => {
      usePopup({
        onClose: onClose,
        closeOnEscape: true,
      });
    });

    const event = new KeyboardEvent('keydown', { code: 'Escape' });
    window.dispatchEvent(event);

    expect(onClose).toBeCalled();
  });

  it('should not close on escape event if closeOnEscape is false', () => {
    renderHook(() => {
      usePopup({
        onClose: onClose,
        closeOnEscape: false,
      });
    });

    const event = new KeyboardEvent('keydown', { code: 'Escape' });
    window.dispatchEvent(event);

    expect(onClose).not.toBeCalled();
  });

  it('should set overflow hidden', () => {
    renderHook(() => {
      usePopup({
        onClose,
        closeOnEscape: true,
        open: true,
        scrollDisabled: true,
      });
    });

    const event = new KeyboardEvent('keydown', { code: 'Escape' });
    window.dispatchEvent(event);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should restore scrolling when open is is false', () => {
    const { rerender } = renderHook(
      ({ open }) =>
        usePopup({
          onClose: vi.fn(),
          closeOnEscape: false,
          open,
          scrollDisabled: true,
        }),
      { initialProps: { open: true } },
    );

    const event = new KeyboardEvent('keydown', { code: 'Escape' });
    window.dispatchEvent(event);

    expect(document.body.style.overflow).toBe('hidden');

    rerender({ open: false });

    expect(document.body.style.overflow).toBe('unset');
  });
});
