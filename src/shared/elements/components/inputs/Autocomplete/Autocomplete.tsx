import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ComponentProps, ReactNode, Ref, useCallback, useState } from 'react';

import { TextField } from '../../../../lib';
import { IOptionType } from '../../../../types';
import { IconComponent } from '../../../ui';
import { Dropdown } from '../../../ui/Dropdown/Dropdown';
import { Input } from '../../../ui/Input/Input';

const cnAutocomplete = cn('Autocomplete');

type HTMLInputProps = Omit<ComponentProps<typeof Input>, 'value' | 'onChange'>;

type AutocompleteProps<T extends IOptionType> = {
  field: TextField<string | number>;
  labelField: keyof T;
  options: T[];
  className?: string;
  uniqueIdentifier?: keyof T;
  ref?: Ref<HTMLDivElement>;
} & HTMLInputProps;

export const Autocomplete = observer(
  <T extends IOptionType>(props: AutocompleteProps<T>): ReactNode => {
    const {
      field,
      className,
      options,
      labelField,
      uniqueIdentifier = 'id',
      ref,
    } = props;

    const getSelectedOption = useCallback((): T | null => {
      return (
        options.find((option) => option[uniqueIdentifier] === field.value) ??
        null
      );
    }, [field.value, options, uniqueIdentifier]);

    const [open, setOpen] = useState(false);
    const [inputOptions, setInputOptions] = useState<T[]>(options);
    const [inputLabel, setInputLabel] = useState<string | number>(
      () => getSelectedOption()?.[labelField] ?? '',
    );

    const [selectedItem, setSelectedItem] = useState<T | null>(() =>
      getSelectedOption(),
    );

    const onItemClick = useCallback(
      (item: T): void => {
        setSelectedItem((prev) => {
          if (!prev) {
            return item;
          }
          return prev[uniqueIdentifier] === item[uniqueIdentifier]
            ? null
            : item;
        });

        if (item[uniqueIdentifier] === field.value) {
          field.toDefaultValue();
          setInputLabel('');
        } else {
          setInputLabel(item[labelField]);
          field.setValue(item[uniqueIdentifier]);
        }

        setOpen(false);
      },

      [field, labelField, uniqueIdentifier],
    );

    const handleOpen = (): void => {
      setOpen(true);
    };

    const handleClose = (): void => {
      setOpen(false);
    };

    const onChange = (value: string | number): void => {
      setInputLabel(value);

      const filteredOptions = options.filter((option) =>
        String(option[labelField])
          .toLowerCase()
          .startsWith(String(value).toLowerCase()),
      );

      setInputOptions(filteredOptions);

      handleOpen();
    };

    const onClose = (): void => {
      handleClose();

      const defaultLabel = getSelectedOption()?.[labelField] ?? '';

      setInputLabel(defaultLabel);

      setInputOptions(options);

      if (!defaultLabel) {
        field.toDefaultValue();
      }
    };

    const handleClear = (): void => {
      field.setValue('');
      setInputLabel('');
      setInputOptions(options);
      setSelectedItem(null);
      handleClose();
    };

    return (
      <div ref={ref} className={cnAutocomplete(undefined, [className])}>
        <Dropdown<T>
          toggleComponent={
            <Input
              value={inputLabel}
              onClick={handleOpen}
              onChange={onChange}
              addonRight={
                field.value && (
                  <IconComponent
                    name={'ClearCircle'}
                    size={'sm'}
                    onClick={handleClear}
                  />
                )
              }
            />
          }
          value={selectedItem}
          options={inputOptions}
          labelField={labelField}
          open={open}
          uniqueIdentifier={uniqueIdentifier}
          openCb={setOpen}
          onItemClick={onItemClick}
          onClose={onClose}
        />
      </div>
    );
  },
);
