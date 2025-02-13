import { useCallback, useState } from 'react';

type useDropdownReturnType = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  toggleOpen: () => void;
};

export const useDropdown = (): useDropdownReturnType => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [setOpen]);

  return { open, handleOpen, handleClose, toggleOpen };
};
