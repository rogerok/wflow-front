import './Input.scss';

import { cn } from '@bem-react/classname';
import { ChangeEvent, FC, InputHTMLAttributes, memo, ReactNode } from 'react';

import { VStack } from '../VStack/VStack';

const cnInput = cn('Input');

export type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  onChange: (value: string | number) => void;
  value: string | number;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  className?: string;
  error?: string;
  fullWidth?: boolean;
  label?: string;
  readOnly?: boolean;
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
    addonLeft,
    addonRight,
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
      {addonLeft && <div>{addonLeft}</div>}
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
      {addonRight && <div>{addonRight}</div>}

      {error && (
        <p className={cnInput('ErrorText', { error: !!error })}>{error}</p>
      )}
    </VStack>
  );
});
