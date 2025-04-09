import './TextArea.scss';

import { cn } from '@bem-react/classname';
import { ChangeEvent, FC, TextareaHTMLAttributes } from 'react';

import { Typography } from '../Typography/Typography';
import { VStack } from '../VStack/VStack';

const cnTextArea = cn('TextArea');

type HTMLTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface TextAreaProps extends HTMLTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  fullWidth?: boolean;
  label?: string;
  readonly?: boolean;
  resizable?: boolean;
  required?: boolean;
}

export const TextArea: FC<TextAreaProps> = (props) => {
  const {
    className,
    onChange,
    readonly,
    fullWidth,
    error,
    value,
    label,
    name,
    disabled,
    resizable = false,
    required,
    ...restProps
  } = props;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(e.target.value);
  };

  return (
    <VStack
      className={cnTextArea(
        { error: !!error, disabled: disabled, fullWidth: fullWidth },
        [className],
      )}
      gap={'4'}
    >
      {label && (
        <label htmlFor={name} className={cnTextArea('Label')}>
          <Typography>{label}</Typography>
          {required && <Typography variant={'warn'}> *</Typography>}
        </label>
      )}
      <textarea
        id={name}
        className={cnTextArea('Input', {
          error: !!error,
          fullWidth: fullWidth,
          resizable: resizable,
        })}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        name={name}
        {...restProps}
      />
      {error && (
        <p className={cnTextArea('ErrorText', { error: !!error })}>{error}</p>
      )}
    </VStack>
  );
};
