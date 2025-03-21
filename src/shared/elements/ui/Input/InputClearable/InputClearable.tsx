import './InputClearable.scss';

import { cn } from '@bem-react/classname';
import { ComponentProps, FC } from 'react';

import { IconComponent } from '../../IconComponent/IconComponent';
import { Input } from '../Input';

interface InputClearableProps
  extends Omit<ComponentProps<typeof Input>, 'addonRight'> {
  handleClear: () => void;
  className?: string;
}

const cnInputClearable = cn('InputClearable');

export const InputClearable: FC<InputClearableProps> = (props) => {
  const { handleClear, className, value, disabled, ...restProps } = props;

  const addonRight = (
    <IconComponent
      className={cnInputClearable('Button', { hidden: !value })}
      name={'ClearCircle'}
      size={'sm'}
      disabled={disabled}
      onClick={handleClear}
    />
  );

  return (
    <Input
      {...restProps}
      className={cnInputClearable(undefined, [className])}
      value={value}
      addonRight={addonRight}
    />
  );
};
