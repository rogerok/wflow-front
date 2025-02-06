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

    const getOptionValue = <T extends BaseAutocompleteOptions>(
      option: T,
      uniqueIdentifier: string,
    ): string | number => {
      return option[uniqueIdentifier];
    };

    return (
      <div className={cnAutocomplete(undefined, [className])}>
        <TextInput field={field} />
        <ul>
          {options.map((option) => (
            <li
              key={getOptionValue(option, String(uniqueIdentifier))}
              onClick={() =>
                field.setValue(getOptionValue(option, String(uniqueIdentifier)))
              }
            >
              {option[labelField]}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
