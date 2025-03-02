import { cn } from '@bem-react/classname';
import { ComponentProps, FC } from 'react';

import { DatePickerInput } from '../DatePickerInput/DatePickerInput';

const cnDateTimePickerInput = cn('DateTimePickerInput');

export const DateTimePickerInput: FC<ComponentProps<typeof DatePickerInput>> = (
  props,
) => {
  return (
    <DatePickerInput
      {...props}
      className={cnDateTimePickerInput(undefined, [props.className])}
      showTimeSelect
      dateFormat={'dd-MM-yyyy hh:mm'}
    />
  );
};
