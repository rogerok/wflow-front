import './Dropdown.scss';

import { cn } from '@bem-react/classname';
import { ComponentProps, ReactNode, useRef } from 'react';

import { getLabel } from '../../../lib';
import { IOptionType } from '../../../types';
import { Button } from '../Button/Button';
import { IconComponent } from '../IconComponent/IconComponent';
import { Popup } from '../Popup/Popup';
import { Typography } from '../Typography/Typography';

const cnDropdown = cn('Dropdown');

type DropdownProps<T extends Record<string, unknown>> = Omit<
  ComponentProps<typeof Popup>,
  | 'className'
  | 'withPortal'
  | 'onClose'
  | 'open'
  | 'anchorRef'
  | 'children'
  | 'placement'
> & {
  options: T[];
  className?: string;
  label?: ReactNode;
  labelField: keyof T;
  onClose?: () => void;
  onItemClick?: (item: T) => void;
  open?: boolean;
  toggleOpen?: () => void;
  title?: string;
  toggleComponent?: ReactNode;
  uniqueIdentifier?: keyof T;
  value?: T | null;
  isLoading?: boolean;
};

export const Dropdown = <T extends IOptionType>(
  props: DropdownProps<T>,
): ReactNode => {
  const {
    className,
    onClose,
    onItemClick,
    toggleComponent,
    label,
    options,
    uniqueIdentifier = 'id',
    labelField = 'title',
    title = 'Выбрать',
    value = null,
    open,
    toggleOpen,
    ...rest
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClose = (): void => onClose?.();

  return (
    <div className={cnDropdown(undefined, [className])} ref={ref}>
      <div className={cnDropdown('Content')}>
        <label className={cnDropdown('Label')}>{label}</label>

        {toggleComponent ? (
          toggleComponent
        ) : (
          <div className={cnDropdown('Toggle', { open: open })}>
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
            >
              <Typography>{getLabel(value?.[labelField]) ?? title}</Typography>
            </Button>
          </div>
        )}

        <Popup
          {...rest}
          className={cnDropdown('Popup')}
          open={open}
          onClose={handleClose}
          anchorRef={ref}
          closeOnOutsideClick
          closeOnEscape
        >
          {options.length ? (
            <ul className={cnDropdown('List')}>
              {!props.isLoading ? (
                options.map((option, idx) => (
                  <li
                    key={idx}
                    onClick={() => onItemClick?.(option)}
                    className={cnDropdown('ListItem', {
                      selected:
                        value?.[uniqueIdentifier] === option[uniqueIdentifier],
                    })}
                  >
                    <Typography>{getLabel(option[labelField])}</Typography>
                  </li>
                ))
              ) : (
                <div>loading</div>
              )}
            </ul>
          ) : (
            <Typography className={cnDropdown('NotFoundLabel')}>
              Не найдено
            </Typography>
          )}
        </Popup>
      </div>
    </div>
  );
};
