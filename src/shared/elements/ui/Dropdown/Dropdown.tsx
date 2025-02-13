import './Dropdown.scss';

import { cn } from '@bem-react/classname';
import {
  ComponentProps,
  memo,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';

import { IOptionType } from '../../../types';
import { Button } from '../Button/Button';
import { IconComponent } from '../IconComponent/IconComponent';
import { Popup } from '../Popup/Popup';
import { Typography } from '../Typography/Typography';

const cnDropdown = cn('Dropdown');

type DropdownProps<T extends IOptionType> = Omit<
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
  openCb?: (open: boolean) => void;
  title?: string;
  toggleComponent?: ReactNode;
  uniqueIdentifier?: keyof T;
  value?: T;
};

const DropdownComponent = <T extends IOptionType>(
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
    openCb,
    ...rest
  } = props;

  const [selectedItem, setSelectedItem] = useState<T | null>(value);

  const ref = useRef<HTMLDivElement>(null);

  const toggleOpen = (): void => {
    openCb?.(!open);
  };

  const handleClose = useCallback((): void => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleItemClick = useCallback(
    (item: T): (() => void) =>
      () => {
        setSelectedItem((prev) => {
          if (!prev) {
            return item;
          }
          return prev[uniqueIdentifier] === item[uniqueIdentifier]
            ? null
            : item;
        });

        onItemClick?.(item);

        handleClose();
      },
    [handleClose, onItemClick, uniqueIdentifier],
  );

  return (
    <div className={cnDropdown(undefined, [props.className])} ref={ref}>
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
              <span className={cnDropdown('Title')}>
                {selectedItem?.[labelField] ?? title}
              </span>
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
              {options.map((option) => (
                <li
                  key={option.id}
                  onClick={handleItemClick(option)}
                  className={cnDropdown('ListItem', {
                    selected:
                      selectedItem?.[uniqueIdentifier] ===
                      option[uniqueIdentifier],
                  })}
                >
                  {option[labelField]}
                </li>
              ))}
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

export const Dropdown = memo(DropdownComponent) as <T extends IOptionType>(
  props: DropdownProps<T>,
) => ReactNode;
