import { useEffect } from 'react';

import { useKeyDown } from '../hooks/useKeyDown';

export interface UsePopupArgs {
  onClose: () => void;
  open?: boolean;
  closeOnEscape?: boolean;
  scrollDisabled?: boolean;
}

export const usePopup = ({
  onClose,
  closeOnEscape,
  open,
  scrollDisabled,
}: UsePopupArgs): void => {
  const handleClose = (): void => {
    if (closeOnEscape) {
      onClose();
    }
  };

  useKeyDown({
    callBack: handleClose,
    keyCode: 'Escape',
  });

  useEffect(() => {
    if (scrollDisabled && open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open, scrollDisabled]);
};
