import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ComponentProps, FC, useEffect, useState } from 'react';

import { BookResponseType } from '../../../../../api';
import { OrderByRequestConstant } from '../../../../../const';
import { TextField } from '../../../../../lib';
import { BooksService } from '../../../../../services';
import { Autocomplete } from '../../Autocomplete/Autocomplete';

const cnBooksAutocomplete = cn('BooksAutocomplete');

type BooksAutocompleteProps = {
  field: TextField<string>;
  className?: string;
} & Omit<
  ComponentProps<typeof Autocomplete<BookResponseType>>,
  'field' | 'options' | 'labelField'
>;

export const BooksAutocomplete: FC<BooksAutocompleteProps> = observer(
  (props) => {
    const { className, field, ...restProps } = props;
    const [service] = useState(
      () =>
        new BooksService({
          page: 1,
          perPage: 0,
          orderBy: OrderByRequestConstant.CreatedAtDesc,
        }),
    );
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
        {...restProps}
        className={cnBooksAutocomplete(undefined, [props.className])}
        field={field}
        options={service.data}
        labelField={'name'}
      />
    );
  },
);
