import { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import { cn } from '@bem-react/classname';
import { TextField } from '../../lib/form';
import { observer } from 'mobx-react-lite';

const cnInput = cn('Input');

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  field: TextField<string>;
}

export const Input: FC<InputProps> = observer((props) => {
  const { className, field } = props;
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
    />
  );
});
