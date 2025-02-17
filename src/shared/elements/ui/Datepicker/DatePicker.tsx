import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

import { cn } from '@bem-react/classname';
import { ru } from 'date-fns/locale';
import { FC, useState } from 'react';
import ReactDatePicker, {
  DatePickerProps as ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';

registerLocale('ru', ru);

const cnDatePicker = cn('DatePicker');

export interface DatePickerProps {
  className?: string;
  value?: string | number;
  onChange?: (date: Date | null) => void;
  showMonthDropdown?: ReactDatePickerProps['showMonthDropdown'];
  showYearDropdown?: ReactDatePickerProps['showYearDropdown'];
  timeIntervals?: ReactDatePickerProps['timeIntervals'];
  scrollableYearDropdown?: ReactDatePickerProps['scrollableYearDropdown'];
  showTimeSelect?: ReactDatePickerProps['showTimeSelect'];
  minDate?: ReactDatePickerProps['minDate'];
  maxDate?: ReactDatePickerProps['maxDate'];
  customInput?: ReactDatePickerProps['customInput'];
  dateFormat?: ReactDatePickerProps['dateFormat'];
}

export const DatePicker: FC<DatePickerProps> = (props) => {
  const {
    onChange,
    value,
    className,
    timeIntervals = 60,
    customInput,
    ...restProps
  } = props;

  const [selectedDate, setSelectedDate] = useState<Date | null>(() =>
    value ? new Date(value) : null,
  );

  const handleChange = (date: Date | null): void => {
    onChange?.(date);
    setSelectedDate(selectedDate);
  };

  return (
    <div className={cnDatePicker(undefined, className)}>
      <ReactDatePicker
        {...restProps}
        onChange={handleChange}
        selected={selectedDate}
        locale={'ru'}
        timeIntervals={timeIntervals}
        scrollableYearDropdown
        customInput={customInput}
      />
    </div>
  );
};
