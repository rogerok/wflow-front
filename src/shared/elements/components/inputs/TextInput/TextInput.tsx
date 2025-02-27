import { cn } from '@bem-react/classname';
import DOMPurify from 'dompurify';
import { observer } from 'mobx-react-lite';
import { ComponentProps, FC } from 'react';

import { TextField } from '../../../../lib/form';
import { Input } from '../../../ui/Input/Input';

const cnTextInput = cn('TextInput');

type HTMLInputProps = Omit<
  ComponentProps<typeof Input>,
  'value' | 'onChange' | 'readOnly'
>;

interface TextInputProps extends HTMLInputProps {
  className?: string;
  field: TextField<string | number>;
}

export const TextInput: FC<TextInputProps> = observer((props) => {
  const { className, field, type = 'text', ...restProps } = props;
  const { value, setValue, error, name } = field;

  const handleChange = (value: string | number): void => {
    if (typeof value === 'string') {
      setValue(DOMPurify.sanitize(value));
    }

    setValue(value);
  };

  return (
    <Input
      className={cnTextInput(undefined, [className])}
      onChange={handleChange}
      value={value}
      name={name}
      type={type}
      error={error}
      {...restProps}
    />
  );
});
