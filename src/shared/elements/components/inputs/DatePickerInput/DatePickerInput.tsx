import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ComponentProps, FC } from 'react';

import { TextField } from '../../../../lib';
import { DatePicker } from '../../../ui';
import { TextInputClearable } from '../TextInputClearable/TextInputClearable';

const cnDatePickerInput = cn('DatePickerInput');

interface DatePickerInputProps
  extends Omit<
    ComponentProps<typeof DatePicker>,
    'onChange' | 'showTimeSelect' | 'customInput'
  > {
  className?: string;
  field: TextField<string | number>;
}

export const DatePickerInput: FC<DatePickerInputProps> = observer((props) => {
  const { field, dateFormat = 'dd-MM-yyyy hh:mm', className } = props;
  const { value, setValue, error, name } = field;

  const handleClear = (): void => setValue('');

  const handleDatePickerChange = (date: Date | null): void => {
    setValue(date ? date.toString() : '');
  };

  // const input = (
  //   <InputClearable
  //     label={'Выберите дату'}
  //     onChange={setValue}
  //     value={value}
  //     name={name}
  //     error={error}
  //     handleClear={handleClear}
  //   />
  // );

  const inputF = (
    <TextInputClearable label={'Выберите дату'} field={field} value={value} />
  );

  return (
    <DatePicker
      className={cnDatePickerInput(undefined, [className])}
      // customInput={input}
      customInput={inputF}
      onChange={handleDatePickerChange}
      value={value}
      dateFormat={dateFormat}
    />
  );
});
