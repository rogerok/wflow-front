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

    const {
      inputLabel,
      selectedItem,
      inputOptions,
      onItemSelect,
      onChange,
      onClose,
      onClear,
    } = useAutocomplete({
      field,
      labelField,
      uniqueIdentifier,
      options,
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
              value={inputLabel}
              onClick={handleOpen}
              onChange={handleChange}
              handleClear={handleClear}
            />
          }
          value={selectedItem}
          options={inputOptions}
          labelField={labelField}
          open={open}
          uniqueIdentifier={uniqueIdentifier}
          toggleOpen={toggleOpen}
          onItemClick={handleItemSelect}
          onClose={onDropdownClose}
        />
      </div>
    );
  },
);
