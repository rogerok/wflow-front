import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ComponentProps, ReactNode, Ref } from 'react';

import { TextField } from '../../../../lib';
import { useAutocomplete } from '../../../../lib/hooks/useAutocomplete';
import { useDropdown } from '../../../../lib/hooks/useDropdown';
import { IOptionType } from '../../../../types';
import { Dropdown } from '../../../ui/Dropdown/Dropdown';
import { Input } from '../../../ui/Input/Input';
import { InputClearable } from '../../../ui/Input/InputClearable/InputClearable';

const cnAutocomplete = cn('Autocomplete');

type HTMLInputProps = Omit<ComponentProps<typeof Input>, 'value' | 'onChange'>;

type AutocompleteProps<T extends IOptionType> = {
  field: TextField<string | number>;
  labelField: keyof T;
  options: T[];
  className?: string;
  ref?: Ref<HTMLDivElement>;
  uniqueIdentifier?: keyof T;
  isLoading?: boolean;
} & HTMLInputProps;

export const Autocomplete = observer(
  <T extends IOptionType>(props: AutocompleteProps<T>): ReactNode => {
    const {
      className,
      field,
      isLoading,
      labelField,
      options,
      ref,
      uniqueIdentifier = 'id',
    } = props;

    const {
      inputLabel,
      inputOptions,
      onItemSelect,
      selectedItem,
      onChange,
      onClose,
      onClear,
    } = useAutocomplete({
      field,
      labelField,
      options,
      uniqueIdentifier,
    });

    const { open, handleOpen, handleClose, toggleOpen } = useDropdown();

    const handleItemSelect = (value: T): void => {
      onItemSelect(value);
      handleClose();
    };

    const handleChange = (value: string | number): void => {
      handleOpen();
      onChange(value);
    };

    const onDropdownClose = (): void => {
      onClose();
      handleClose();
    };

    const handleClear = (): void => {
      handleClose();
      onClear();
    };

    return (
      <div ref={ref} className={cnAutocomplete(undefined, [className])}>
        <Dropdown<T>
          toggleComponent={
            <InputClearable
              handleClear={handleClear}
              onChange={handleChange}
              onClick={handleOpen}
              value={inputLabel}
            />
          }
          isLoading={isLoading}
          labelField={labelField}
          onClose={onDropdownClose}
          onItemClick={handleItemSelect}
          open={open}
          options={inputOptions}
          toggleOpen={toggleOpen}
          uniqueIdentifier={uniqueIdentifier}
          value={selectedItem}
        />
      </div>
    );
  },
);
