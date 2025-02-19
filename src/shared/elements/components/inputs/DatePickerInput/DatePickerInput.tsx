import { cn } from '@bem-react/classname';
import { format, formatISO } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { ComponentProps, FC, useEffect, useState } from 'react';

import { TextField } from '../../../../lib';
import { useGlobalStore } from '../../../../stores';
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
  label?: string;
  fullWidth?: boolean;
}

export const DatePickerInput: FC<DatePickerInputProps> = observer((props) => {
  const {
    field,
    dateFormat = 'dd-MM-yyyy',
    className,
    label,
    fullWidth,
    ...restProps
  } = props;
  const { setValue, value, error, name } = field;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setSelectedDate(() => (value ? new Date(value) : null));
  }, [value]);

  const store = useGlobalStore();
  const inputValue = selectedDate ? format(selectedDate, dateFormat) : '';

  const handleClear = (): void => {
    setValue('');
    setSelectedDate(null);
  };

  const handleDatePickerChange = (date: Date | null): void => {
    if (date) {
      setValue(formatISO(date));
      setSelectedDate(date);
    } else {
      setValue('');
    }
  };

  const input = (
    <InputClearable
      label={label}
      value={inputValue}
      handleClear={handleClear}
      fullWidth={fullWidth}
      error={error}
      name={name}
    />
  );

  return (
    <DatePicker
      {...restProps}
      fullWidth={fullWidth}
      className={cnDatePickerInput(undefined, [className])}
      customInput={input}
      selectedDate={selectedDate}
      onChange={handleDatePickerChange}
      dateFormat={dateFormat}
      withPortal={store.screen.downMd}
    />
  );
});
