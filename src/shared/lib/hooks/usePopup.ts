import { useCallback, useEffect } from 'react';

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
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.code === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose],
  );

  useEffect(() => {
    if (open && closeOnEscape) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeOnEscape, handleKeyDown, open]);

  useEffect(() => {
    if (scrollDisabled && open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open, scrollDisabled]);
};
