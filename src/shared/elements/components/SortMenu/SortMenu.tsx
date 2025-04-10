import { cn } from '@bem-react/classname';
import { FC, useState } from 'react';

import { useOpenClose } from '../../../lib/hooks/useOpenClose';
import { SortOptionsTypes, SortOptionType } from '../../../types';
import { Dropdown } from '../../ui/Dropdown/Dropdown';

const cnSortMenu = cn('SortMenu');

type SortMenuProps = {
  className?: string;
  onChange?: (value: SortOptionType) => void;
  options: SortOptionsTypes;
  defaultValue?: SortOptionType;
  title?: string;
};

export const SortMenu: FC<SortMenuProps> = (props) => {
  const {
    className,
    options,
    onChange,
    defaultValue,
    title = 'Выбрать',
  } = props;
  const { open, handleClose, toggleOpen } = useOpenClose();
  const [menuTitle, setMenuTitle] = useState(title);
  const onItemClick = (value: SortOptionType): void => {
    onChange?.(value);
    setMenuTitle(value.label);
    handleClose();
  };

  return (
    <div className={cnSortMenu(undefined, [className])}>
      <Dropdown<SortOptionType>
        labelField={'label'}
        options={options}
        title={menuTitle}
        uniqueIdentifier={'value'}
        onItemClick={onItemClick}
        open={open}
        onClose={handleClose}
        toggleOpen={toggleOpen}
      />
    </div>
  );
};
