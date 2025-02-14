import { useState } from 'react';

type useDropdownReturnType = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  toggleOpen: () => void;
};

export const useDropdown = (): useDropdownReturnType => {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const toggleOpen = (): void => setOpen((prev) => !prev);

  return { open, handleOpen, handleClose, toggleOpen };
};
