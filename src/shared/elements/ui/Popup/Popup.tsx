import './Popup.scss';

import { cn } from '@bem-react/classname';
import { memo, ReactNode, RefObject, useEffect, useRef } from 'react';

import {
  handleClickOutside,
  HandleClickOutsideReturnType,
  usePopup,
} from '../../../lib';
import { Portal, PortalProps } from '../Portal/Portal';

const cnPopup = cn('Popup');

type Placement = 'top-left' | 'bottom-right' | 'bottom-left' | 'top-right';

interface PopupProps<T extends HTMLElement = HTMLElement> {
  children: ReactNode;
  onClose: () => void;
  anchorRef?: RefObject<T | null>;
  className?: string;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  container?: PortalProps['container'];
  open?: boolean;
  placement?: Placement;
  scrollDisabled?: boolean;
  withPortal?: boolean;
  zIndex?: number;
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
      placement = 'bottom-left',
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

    const mods = {
      position: placement,
    };

    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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

      const clickListener = outsideClickListener();
      if (open && clickListener && closeOnOutsideClick) {
        document.addEventListener('mousedown', clickListener);
        document.addEventListener('touchend', clickListener);
      }

      return () => {
        if (clickListener) {
          document.removeEventListener('mousedown', clickListener);
          document.removeEventListener('touchend', clickListener);
        }
      };
    }, [anchorRef, closeOnOutsideClick, onClose, open]);

    const content = (
      <div
        ref={popupRef}
        className={cnPopup(mods, [className])}
        style={{
          zIndex: zIndex,
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
