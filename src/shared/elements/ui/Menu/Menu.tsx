import { cn } from '@bem-react/classname';
import { ReactNode, useState } from 'react';

import { useOpenClose } from '../../../lib/hooks/useOpenClose';
import { SortOptionsTypes, SortOptionType } from '../../../types';
import { Dropdown } from '../Dropdown/Dropdown';

const cnSortMenu = cn('Menu');

type MenuProps<T extends string | number> = {
  className?: string;
  onChange?: (value: T) => void;
  options: SortOptionsTypes<T>;
  title?: string;
};

export const Menu = <T extends string | number>(
  props: MenuProps<T>,
): ReactNode => {
  const { className, options, onChange, title = 'Выбрать' } = props;
  const { open, handleClose, toggleOpen } = useOpenClose();
  const [selected, setSelected] = useState<SortOptionType<T> | null>(null);

  const onItemClick = (option: SortOptionType<T>): void => {
    onChange?.(option.value);
    setSelected(option);
    handleClose();
  };

  return (
    <Dropdown<SortOptionType<T>>
      className={cnSortMenu(undefined, [className])}
      labelField={'label'}
      options={options}
      title={selected?.label ?? title}
      uniqueIdentifier={'value'}
      onItemClick={onItemClick}
      open={open}
      value={selected}
      onClose={handleClose}
      toggleOpen={toggleOpen}
    />
  );
};
