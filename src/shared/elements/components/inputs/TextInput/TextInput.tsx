import { cn } from '@bem-react/classname';
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

  return (
    <Input
      className={cnTextInput(undefined, [className])}
      onChange={setValue}
      value={value}
      name={name}
      type={type}
      error={error}
      {...restProps}
    />
  );
});
