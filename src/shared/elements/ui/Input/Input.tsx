import './Input.scss';

import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, InputHTMLAttributes } from 'react';

import { VStack } from '../VStack/VStack';

const cnInput = cn('Input');

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  onChange: (value: string) => void;
  value: string;
  className?: string;
  readOnly?: boolean;
  error?: string;
  tag?: 'input' | 'textarea';
  label?: string;
  fullWidth?: boolean;
}

export const Input: FC<InputProps> = observer((props) => {
  const {
    className,
    type = 'text',
    value,
    name,
    onChange,
    label,
    fullWidth,
    tag = 'input',
    disabled,
    error,
    ...restProps
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <VStack
      className={cnInput(
        { error: !!error, disabled: disabled, fullWidth: fullWidth },
        [className],
      )}
      gap={'4'}
    >
      {label && (
        <label htmlFor={name} className={cnInput('Label')}>
          {label}
        </label>
      )}
      <input
        id={name}
        className={cnInput('Input', { error: !!error, fullWidth: fullWidth })}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        name={name}
        type={type}
        {...restProps}
      />
      {error && (
        <p className={cnInput('ErrorText', { error: !!error })}>{error}</p>
      )}
    </VStack>
  );
});
