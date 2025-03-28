import { act, renderHook } from '@testing-library/react';
import { describe } from 'vitest';

import { useOpenClose } from '../useOpenClose';

describe('useOpenClose hook', () => {
  it('should initialize with open set to false', () => {
    const { result } = renderHook(() => useOpenClose());
    const { open } = result.current;

    expect(open).toBe(false);
  });

  it('should set open to true when handleOpen is called', () => {
    const { result } = renderHook(() => useOpenClose());
    act(() => {
      result.current.handleOpen();
    });

    expect(result.current.open).toBe(true);
  });

  it('should set open to false when handleClose is called', () => {
    const { result } = renderHook(() => useOpenClose());

    act(() => {
      result.current.handleOpen();
      result.current.handleClose();
    });

    expect(result.current.open).toBe(false);
  });
});
