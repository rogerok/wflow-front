import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, ComponentProps, FC } from 'react';

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
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: FC<TextInputProps> = observer((props) => {
  const { className, field, type = 'text', handleChange, ...restProps } = props;
  const { value, error, name } = field;

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    field.setValue(e.target.value);
    handleChange?.(e);
  };

  return (
    <Input
      className={cnTextInput(undefined, [className])}
      onChange={onChange}
      value={value}
      name={name}
      type={type}
      error={error}
      {...restProps}
    />
  );
});
