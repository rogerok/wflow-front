import { cn } from '@bem-react/classname';
import { observer } from 'mobx-react-lite';
import { ComponentProps, FC } from 'react';

import { TextField } from '../../../../lib';
import { InputClearable } from '../../../ui/Input/InputClearable/InputClearable';

const cnTextInputClearable = cn('TextInputClearable');

interface TextInputClearableProps
  extends Omit<ComponentProps<typeof InputClearable>, 'handleClear'> {
  className?: string;
  onClear?: () => void;
  field: TextField<string | number>;
}

export const TextInputClearable: FC<TextInputClearableProps> = observer(
  (props) => {
    const { field, className, onClear, ...rest } = props;
    const { value, setValue, error, name } = field;

    const handleClear = (): void => {
      setValue('');

      if (onClear) {
        onClear();
      }
    };

    return (
      <InputClearable
        {...rest}
        className={cnTextInputClearable(undefined, [props.className])}
        onChange={setValue}
        value={value}
        name={name}
        error={error}
        handleClear={handleClear}
      />
    );
  },
);
