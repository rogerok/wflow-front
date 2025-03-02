import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ComponentProps, FC, useEffect, useState } from 'react';

import { GoalResponseType } from '../../../../../api';
import { GoalsListRequestDefaultParams } from '../../../../../const';
import { TextField } from '../../../../../lib';
import { GoalsService } from '../../../../../services';
import { Autocomplete } from '../../Autocomplete/Autocomplete';

const cnGoalsAutocomplete = cn('GoalsAutocomplete');

type GoalsAutocompleteProps = {
  field: TextField<string>;
  className?: string;
  bookId?: string;
} & Omit<
  ComponentProps<typeof Autocomplete<GoalResponseType>>,
  'field' | 'options' | 'labelField'
>;

export const GoalsAutocomplete: FC<GoalsAutocompleteProps> = observer(
  (props) => {
    const { className, bookId, ...restProps } = props;

    const [service] = useState(
      () =>
        new GoalsService({
          ...GoalsListRequestDefaultParams,
          bookId: bookId ?? null,
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
      <Autocomplete<GoalResponseType>
        {...restProps}
        className={cnGoalsAutocomplete(undefined, [className])}
        options={service.data}
        labelField={'title'}
      />
    );
  },
);
