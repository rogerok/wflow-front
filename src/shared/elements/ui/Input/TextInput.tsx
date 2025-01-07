import { cn } from '@bem-react/classname';
import { TextField } from '@shared';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, FC, InputHTMLAttributes } from 'react';

const cnInput = cn('TextInput');

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;

interface TextInputProps extends HTMLInputProps {
  className?: string;
  field: TextField<string>;
}

export const TextInput: FC<TextInputProps> = observer((props) => {
  const { className, field, type = 'text', ...restProps } = props;
  const { value, setValue, error, name } = field;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
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
      {error && <div className="error">{error}</div>}
    </>
  );
});
