import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, InputHTMLAttributes } from 'react';

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
}

export const Input: FC<InputProps> = observer((props) => {
  const {
    className,
    type = 'text',
    value,
    name,
    onChange,
    tag = 'input',
    ...restProps
  } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <>
      <input
        className={cnInput(undefined, [className])}
        onChange={handleChange}
        value={value}
        name={name}
        type={type}
        {...restProps}
      />
      {props.error && <div className="error">{props.error}</div>}
    </>
  );
});
