import './Dropdown.scss';

import { cn } from '@bem-react/classname';
import { ComponentProps, memo, ReactNode, useRef, useState } from 'react';

import { Button } from '../Button/Button';
import { IconComponent } from '../IconComponent/IconComponent';
import { Popup } from '../Popup/Popup';

const cnDropdown = cn('Dropdown');

interface BaseDropdownOptions extends Record<string, string | number> {
  id: string | number;
}

type DropdownProps<T extends BaseDropdownOptions> = Omit<
  ComponentProps<typeof Popup>,
  'className' | 'withPortal' | 'onClose' | 'open' | 'anchorRef' | 'children'
> & {
  options: T[];
  className?: string;
  onClose?: () => void;
  labelField: keyof T;
  label?: ReactNode;
  onItemClick?: () => void;
  toggleComponent?: ReactNode;
};

export const Dropdown = memo(
  <T extends BaseDropdownOptions>(props: DropdownProps<T>) => {
    const {
      className,
      onClose,
      placement = 'bottom',
      onItemClick,
      toggleComponent,
      label,
      options,
      ...rest
    } = props;
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const handleClose = (): void => {
      if (onClose) {
        onClose();
      }

      setOpen(false);
    };

    const toggleOpen = (): void => {
      setOpen((prev) => !prev);
    };

    const handleItemClick = (option: T): void => {
      if (onItemClick) {
        handleItemClick(option);
      }
    };

    return (
      <div ref={ref} className={cnDropdown(undefined, [props.className])}>
        <label className={cnDropdown('Label')}>{label}</label>
        {toggleComponent ? (
          toggleComponent
        ) : (
          <Button
            className={cnDropdown('Button')}
            variant={'clear'}
            fullWidth
            size={'sm'}
            onClick={toggleOpen}
            addonRight={
              <IconComponent
                className={cnDropdown('ArrowIcon', {
                  open: open,
                })}
                name={'ArrowSm'}
                size={'md'}
                color={'basic-primary'}
              />
            }
          />
        )}
        <Popup
          {...rest}
          className={cnDropdown('Popup')}
          open={open}
          // open={true}
          placement={'top'}
          onClose={handleClose}
          anchorRef={ref}
          closeOnOutsideClick
          closeOnEscape
        >
          <ul className={cnDropdown('List')}>
            {options.map((option) => (
              <li key={option.id} className={cnDropdown('ListItem')}>
                {option.id}
              </li>
            ))}
          </ul>
        </Popup>
      </div>
    );
  },
);
