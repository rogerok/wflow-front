import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

import { cn } from '@bem-react/classname';
import { FC } from 'react';
import ReactDatePicker from 'react-datepicker';

const cnDatePicker = cn('DatePicker');

interface DatePickerProps {
  className?: string;
  onChange: (date: Date | null) => void;
}

export const DatePicker: FC<DatePickerProps> = (props) => {
  const { onChange, className } = props;

  return (
    <ReactDatePicker
      // wrapperClassName={}
      className={cnDatePicker(undefined, [className])}
      onChange={onChange}
      open
    />
  );
};
