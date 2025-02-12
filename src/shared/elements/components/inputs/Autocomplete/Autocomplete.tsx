import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, ReactNode, Ref, useState } from 'react';

import { TextField } from '../../../../lib';
import { Dropdown } from '../../../ui/Dropdown/Dropdown';
import { TextInput } from '../TextInput/TextInput';

const cnAutocomplete = cn('Autocomplete');

interface BaseAutocompleteOptions extends Record<string, string | number> {
  id: string | number;
}

interface AutocompleteProps<T extends BaseAutocompleteOptions> {
  className?: string;
  field: TextField<string | number>;
  options: T[];
  labelField: keyof T;
  uniqueIdentifier?: 'id' | keyof T;
  ref?: Ref<HTMLDivElement>;
}

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

    const [open, setOpen] = useState(false);
    const [inputOptions, setInputOptions] = useState<T[]>(options);

    const onItemClick = (item: T): void => {
      field.setValue(item[uniqueIdentifier]);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
      console.log(e.target.value);

      setInputOptions((options) =>
        options.filter((option) =>
          new RegExp(`^${e.target.value.toLowerCase()}`).test(
            String(option[labelField]).toLowerCase(),
          ),
        ),
      );
    };

    console.log(inputOptions);

    return (
      <div ref={ref} className={cnAutocomplete(undefined, [className])}>
        <Dropdown<T>
          toggleComponent={
            <TextInput
              field={field}
              onClick={() => setOpen(true)}
              handleChange={onChange}
            />
          }
          options={inputOptions}
          labelField={labelField}
          open={open}
          uniqueIdentifier={uniqueIdentifier}
          openCb={setOpen}
          onItemClick={onItemClick}
        />
      </div>
    );
  },
);
