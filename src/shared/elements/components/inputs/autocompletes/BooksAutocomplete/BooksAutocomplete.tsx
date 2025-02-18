import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { TextField } from '../../../../../lib';
import { BooksService } from '../../../../../services';
import { BookResponseType } from '../../../../../types';
import { Autocomplete } from '../../Autocomplete/Autocomplete';

const cnBooksAutocomplete = cn('BooksAutocomplete');

interface BooksAutocompleteProps {
  field: TextField<string>;
  className?: string;
  label?: string;
}

export const BooksAutocomplete: FC<BooksAutocompleteProps> = observer(
  (props) => {
    const { field, label } = props;
    const [service] = useState(() => new BooksService());
    const { abortRequest, list, data } = service;

    useEffect(() => {
      if (!data.length) {
        list();
      }
      return () => {
        abortRequest();
      };
    }, [abortRequest, data.length, list]);

    return (
      <Autocomplete<BookResponseType>
        className={cnBooksAutocomplete(undefined, [props.className])}
        label={label}
        field={field}
        options={service.data}
        labelField={'name'}
      />
    );
  },
);
