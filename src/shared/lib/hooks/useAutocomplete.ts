import { useState } from 'react';

import { IOptionType } from '../../types';
import { TextField } from '../form';

type useAutocompleteReturnType<T extends IOptionType> = {
  inputLabel: string | number;
  selectedItem: T | null;
  onItemSelect: (item: T) => void;
  onChange: (value: string | number) => void;
  onClose: () => void;
  inputOptions: T[];
  onClear: () => void;
};
type useAutocompleteArgs<T extends IOptionType> = {
  field: TextField<string | number>;
  options: T[];
  uniqueIdentifier: keyof T;
  labelField: keyof T;
};

export const useAutocomplete = <T extends IOptionType>({
  field,
  labelField,
  uniqueIdentifier,
  options,
}: useAutocompleteArgs<T>): useAutocompleteReturnType<T> => {
  const getSelectedOption = (): T | null => {
    return (
      options.find((option) => option[uniqueIdentifier] === field.value) ?? null
    );
  };

  const [inputOptions, setInputOptions] = useState<T[]>(options);
  const [inputLabel, setInputLabel] = useState<string | number>(
    () => getSelectedOption()?.[labelField] ?? '',
  );

  const [selectedItem, setSelectedItem] = useState<T | null>(() =>
    getSelectedOption(),
  );

  const onItemSelect = (item: T): void => {
    setSelectedItem((prev) => {
      if (!prev) {
        return item;
      }
      return prev[uniqueIdentifier] === item[uniqueIdentifier] ? null : item;
    });

    if (item[uniqueIdentifier] === field.value) {
      field.toDefaultValue();
      setInputLabel('');
    } else {
      setInputLabel(item[labelField]);
      field.setValue(item[uniqueIdentifier]);
    }
  };

  const onChange = (value: string | number): void => {
    setInputLabel(value);

    const filteredOptions = options.filter((option) =>
      String(option[labelField])
        .toLowerCase()
        .startsWith(String(value).toLowerCase()),
    );

    setInputOptions(filteredOptions);
  };

  const onClose = (): void => {
    const defaultLabel = getSelectedOption()?.[labelField] ?? '';

    setInputLabel(defaultLabel);

    setInputOptions(options);

    if (!defaultLabel) {
      field.toDefaultValue();
    }
  };

  const onClear = (): void => {
    field.setValue('');
    setInputLabel('');
    setInputOptions(options);
    setSelectedItem(null);
  };

  return {
    inputLabel,
    selectedItem,
    inputOptions,
    onItemSelect,
    onChange,
    onClose,
    onClear,
  };
};
