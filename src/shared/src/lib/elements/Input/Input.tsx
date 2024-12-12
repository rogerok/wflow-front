import { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import { cn } from '@bem-react/classname';
import { FormField } from '../../lib/form';
import { observer } from 'mobx-react-lite';

const cnInput = cn('Input');

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  field: FormField<string>;
}

export const Input: FC<InputProps> = observer((props) => {
  const { className, field, ...restProps } = props;
  const { value, onChange, error } = field;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  console.log(value);

  return (
    <input
      className={cnInput(undefined, [className])}
      onChange={handleChange}
      value={value}
      {...restProps}
    />
  );
});
