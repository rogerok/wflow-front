import './Input.scss';

import { cn } from '@bem-react/classname';
import { ChangeEvent, FC, InputHTMLAttributes, memo } from 'react';

import { VStack } from '../VStack/VStack';

const cnInput = cn('Input');

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;

  value: string | number;
  className?: string;
  readOnly?: boolean;
  error?: string;
  label?: string;
  fullWidth?: boolean;
}

export const Input: FC<InputProps> = memo((props) => {
  const {
    className,
    type = 'text',
    value,
    name,
    onChange,
    label,
    fullWidth,
    disabled,
    error,
    ...restProps
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e);
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
