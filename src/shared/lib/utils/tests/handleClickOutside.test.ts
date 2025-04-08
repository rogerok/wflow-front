import { RefObject } from 'react';
import { expect } from 'vitest';

import { handleClickOutside } from '../handleClickOutside';

describe('handleClickOutside', () => {
  let callback = vi.fn();
  let ref: RefObject<HTMLElement | null>;

  beforeEach(() => {
    callback = vi.fn();
    ref = { current: null };
  });

  it('should call callback when clicking outside the element', () => {
    const handleClick = handleClickOutside({ ref, callback });

    ref.current = document.createElement('div');
    document.body.appendChild(ref.current);

    const outsideEvent = new MouseEvent('click', {
      bubbles: true,
    });
    document.body.dispatchEvent(outsideEvent);

    handleClick(outsideEvent);

    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback when clicking inside the element', () => {
    ref.current = document.createElement('div');
    document.body.appendChild(ref.current);

    const handleClick = handleClickOutside({ ref, callback });

    const insideEvent = new MouseEvent('click', {
      bubbles: true,
    });
    Object.defineProperty(insideEvent, 'target', { value: ref.current });

    document.dispatchEvent(insideEvent);
    handleClick(insideEvent);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle array of refs', () => {
    const handleClick = handleClickOutside({
      ref: [ref, { current: document.createElement('div') }],
      callback,
    });

    ref.current = document.createElement('div');
    document.body.appendChild(ref.current);

    const outsideEvent = new MouseEvent('click', { bubbles: true });
    document.dispatchEvent(outsideEvent);

    handleClick(outsideEvent);
    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback if event target is null or undefined', () => {
    const handleClick = handleClickOutside({ ref, callback });

    const nullEvent = new MouseEvent('click');
    document.dispatchEvent(nullEvent);

    handleClick(nullEvent);

    expect(callback).not.toHaveBeenCalled();
  });
});
