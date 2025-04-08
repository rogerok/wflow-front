import { useCallback, useEffect, useState } from 'react';

import { IOptionType } from '../../types';
import { TextField } from '../form';
import { getLabel } from '../utils/helpers';

type useAutocompleteReturnType<T extends IOptionType> = {
  inputLabel: string | number;
  selectedItem: T | null;
  onItemSelect: (item: T) => void;
  onChange: (value: string | number) => void;
  onClose: () => void;
  inputOptions: T[];
  onClear: () => void;
};

export type useAutocompleteArgs<T extends IOptionType> = {
  field: TextField<string | number>;
  options: T[];
  uniqueIdentifier: keyof T;
  labelField: keyof T;
};

export const useAutocomplete = <T extends IOptionType>({
  field,
  labelField,
  uniqueIdentifier = 'id',
  options,
}: useAutocompleteArgs<T>): useAutocompleteReturnType<T> => {
  const getSelectedOption = useCallback((): T | null => {
    return (
      options.find((option) => option[uniqueIdentifier] === field.value) ?? null
    );
  }, [field.value, options, uniqueIdentifier]);

  const [inputOptions, setInputOptions] = useState<T[]>([]);
  const [inputLabel, setInputLabel] = useState<string | number>(
    () => getLabel(getSelectedOption()?.[labelField]) ?? '',
  );

  const [selectedItem, setSelectedItem] = useState<T | null>(() =>
    getSelectedOption(),
  );

  useEffect(() => {
    setInputOptions(options);

    if (getSelectedOption()?.id !== field.value) {
      setInputLabel('');
      setSelectedItem(null);
    }
  }, [field.value, getSelectedOption, options]);

  const onItemSelect = (item: T): void => {
    const val = item[uniqueIdentifier];

    setSelectedItem((prev) => {
      if (!prev) {
        return item;
      }
      return prev[uniqueIdentifier] === item[uniqueIdentifier] ? null : item;
    });

    if (val === field.value) {
      field.toDefaultValue();
      setInputLabel('');
    } else {
      if (typeof val === 'string' || typeof val === 'number') {
        field.setValue(val);
      }

      if (item[labelField]) {
        setInputLabel(getLabel(item[labelField]) ?? '');
      }
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

    setInputLabel(getLabel(defaultLabel) ?? '');

    setInputOptions(options);

    if (!defaultLabel) {
      field.toDefaultValue();
    }
  };

  const onClear = (): void => {
    field.reset();
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
