import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';

import { TextField } from '../../../../lib';
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
    } = props;

    const getOptionValue = (
      option: T,
      uniqueIdentifier: string,
    ): string | number => {
      if (uniqueIdentifier in option) {
        return option[uniqueIdentifier];
      } else {
        return option.id;
      }
    };

    return (
      <div className={cnAutocomplete(undefined, [className])}>
        <TextInput field={field} />
        <ul>
          {options.map((value) => (
            <li
              // key={getOptionValue(value, uniqueIdentifier)}
              onClick={() => field.setValue(value.id)}
            >
              {String(value[labelField])}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
