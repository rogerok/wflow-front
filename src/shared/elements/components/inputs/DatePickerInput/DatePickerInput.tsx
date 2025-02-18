import { cn } from '@bem-react/classname';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { ComponentProps, FC, useState } from 'react';

import { TextField } from '../../../../lib';
import { DatePicker } from '../../../ui';
import { InputClearable } from '../../../ui/Input/InputClearable/InputClearable';

const cnDatePickerInput = cn('DatePickerInput');

interface DatePickerInputProps
  extends Omit<
    ComponentProps<typeof DatePicker>,
    'onChange' | 'customInput' | 'dateFormat'
  > {
  className?: string;
  field: TextField<string | number>;
  dateFormat?: string;
}

export const DatePickerInput: FC<DatePickerInputProps> = observer((props) => {
  const { field, dateFormat = 'dd-MM-yyyy', className, ...restProps } = props;
  const { setValue, value } = field;
  const [selectedDate, setSelectedDate] = useState<Date | null>(() =>
    value ? new Date(value) : null,
  );

  const inputValue = selectedDate ? format(selectedDate, dateFormat) : '';

  const handleClear = (): void => {
    setValue('');
    setSelectedDate(null);
  };

  const handleDatePickerChange = (date: Date | null): void => {
    if (date) {
      setValue(date.toString());
      setSelectedDate(date);
    } else {
      setValue('');
    }
  };

  const input = (
    <InputClearable
      label={'Выберите дату'}
      value={inputValue}
      handleClear={handleClear}
    />
  );

  return (
    <DatePicker
      {...restProps}
      className={cnDatePickerInput(undefined, [className])}
      customInput={input}
      selectedDate={selectedDate}
      onChange={handleDatePickerChange}
      dateFormat={dateFormat}
    />
  );
});
