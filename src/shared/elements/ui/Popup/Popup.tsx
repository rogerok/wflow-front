import { cn } from '@bem-react/classname';
import { memo, ReactNode, RefObject, useEffect, useRef } from 'react';

import {
  handleClickOutside,
  HandleClickOutsideReturnType,
  usePopup,
} from '../../../lib';
import { Portal, PortalProps } from '../Portal/Portal';

const cnPopup = cn('Popup');

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface PopupProps<T extends HTMLElement = HTMLElement> {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  container?: PortalProps['container'];
  open?: boolean;
  zIndex?: number;
  closeOnEscape?: boolean;
  placement?: Placement;
  withPortal?: boolean;
  scrollDisabled?: boolean;
  closeOnOutsideClick?: boolean;
  anchorRef?: RefObject<T | null>;
}

export const Popup = memo(
  <T extends HTMLElement = HTMLElement>(props: PopupProps<T>) => {
    const {
      children,
      container,
      className,
      open,
      zIndex = 10,
      closeOnEscape,
      placement = 'bottom',
      closeOnOutsideClick = true,
      onClose,
      scrollDisabled,
      anchorRef,
    } = props;

    usePopup({
      scrollDisabled: scrollDisabled,
      open: open,
      closeOnEscape: closeOnEscape,
      onClose: onClose,
    });

    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (open && anchorRef?.current && popupRef.current) {
        const anchorRect = anchorRef.current.getBoundingClientRect();
        const popupEl = popupRef.current;

        let top = 0;
        let left = 0;

        switch (placement) {
          case 'top':
            top = anchorRect.top - popupEl.offsetHeight - 8;
            left =
              anchorRect.left + anchorRect.width / 2 - popupEl.offsetWidth / 2;
            break;
          case 'bottom':
            top = anchorRect.bottom + 8;
            left =
              anchorRect.left + anchorRect.width / 2 - popupEl.offsetWidth / 2;
            break;
          case 'left':
            top =
              anchorRect.top + anchorRect.height / 2 - popupEl.offsetHeight / 2;
            left = anchorRect.left - popupEl.offsetWidth - 8;
            break;
          case 'right':
            top =
              anchorRect.top + anchorRect.height / 2 - popupEl.offsetHeight / 2;
            left = anchorRect.right + 8;
            break;
        }

        popupEl.style.top = `${top}px`;
        popupEl.style.left = `${left}px`;
      }
    }, [anchorRef, open, placement]);

    const outsideClickListener = ():
      | HandleClickOutsideReturnType
      | undefined => {
      return popupRef && anchorRef
        ? handleClickOutside({
            callback: onClose,
            ref: [anchorRef, popupRef],
          })
        : undefined;
    };

    useEffect(() => {
      const clickListener = outsideClickListener();
      if (open && clickListener && closeOnOutsideClick) {
        document.addEventListener('mousedown', clickListener);
        document.addEventListener('touchend', clickListener);
      }

      return () => {
        if (clickListener) {
          document.removeEventListener('mousedown', clickListener);
          document.addEventListener('touchend', clickListener);
        }
      };
    }, [closeOnOutsideClick, open, outsideClickListener]);

    const content = (
      <div
        ref={popupRef}
        className={cnPopup(undefined, [className])}
        style={{
          zIndex: zIndex,
          // position: 'absolute',
        }}
      >
        {children}
      </div>
    );

    if (!open) {
      return null;
    }

    return props.withPortal ? (
      <Portal container={container}>{content}</Portal>
    ) : (
      content
    );
  },
);
