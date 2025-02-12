import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ComponentProps, ReactNode, Ref, useState } from 'react';

import { TextField } from '../../../../lib';
import { Dropdown } from '../../../ui/Dropdown/Dropdown';
import { Input } from '../../../ui/Input/Input';

const cnAutocomplete = cn('Autocomplete');

interface BaseAutocompleteOptions extends Record<string, string | number> {
  id: string | number;
}

type HTMLInputProps = Omit<ComponentProps<typeof Input>, 'value' | 'onChange'>;

type AutocompleteProps<T extends BaseAutocompleteOptions> = {
  className?: string;
  field: TextField<string | number>;
  options: T[];
  labelField: keyof T;
  uniqueIdentifier?: keyof T;
  ref?: Ref<HTMLDivElement>;
} & HTMLInputProps;

export const Autocomplete = observer(
  <T extends BaseAutocompleteOptions>(
    props: AutocompleteProps<T>,
  ): ReactNode => {
    const {
      field,
      className,
      options,
      labelField,
      uniqueIdentifier = 'id',
      ref,
    } = props;

    const getLabelDefault = (): string | number => {
      return (
        options.find((option) => option[uniqueIdentifier] === field.value)?.[
          labelField
        ] ?? ''
      );
    };

    const [open, setOpen] = useState(false);
    const [inputOptions, setInputOptions] = useState<T[]>(options);
    const [inputLabel, setInputLabel] = useState<string | number>(() =>
      getLabelDefault(),
    );

    const onItemClick = (item: T): void => {
      setInputLabel(item[labelField]);
      field.setValue(item[uniqueIdentifier]);
    };

    const onChange = (value: string | number): void => {
      setInputLabel(value);

      const filteredOptions = options.filter((option) =>
        String(option[labelField])
          .toLowerCase()
          .startsWith(String(value).toLowerCase()),
      );

      setInputOptions(filteredOptions);

      setOpen(true);
    };

    const handleClose = (): void => {
      setOpen(false);
      setInputLabel(getLabelDefault());

      // setInputOptions();

      // if (!inputOptions.length) {
      //   setInputOptions(options);
      //   setInputLabel('');
      //   field.reset();
      // }
    };

    return (
      <div ref={ref} className={cnAutocomplete(undefined, [className])}>
        <Dropdown<T>
          toggleComponent={
            <Input
              value={inputLabel}
              onClick={() => setOpen(true)}
              onChange={onChange}
            />
          }
          options={inputOptions}
          labelField={labelField}
          open={open}
          uniqueIdentifier={uniqueIdentifier}
          openCb={setOpen}
          onItemClick={onItemClick}
          onClose={handleClose}
        />
      </div>
    );
  },
);
