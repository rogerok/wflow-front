import './Button.scss';

import { cn } from '@bem-react/classname';
import { ButtonHTMLAttributes, FC, memo, ReactNode } from 'react';

const cnButton = cn('Button');

type ButtonVariantsType = 'filled' | 'outlined' | 'clear';

type ButtonSizesType = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  fullWidth?: boolean;
  size?: ButtonSizesType;
  variant?: ButtonVariantsType;
  disabled?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className,
    disabled,
    fullWidth,
    size = 'sm',
    variant = 'filled',
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const mods = {
    size: size,
    variant: variant,
    fullWidth: fullWidth,
    disabled: disabled,
  };

  return (
    <button
      type={'button'}
      {...otherProps}
      disabled={disabled}
      className={cnButton(mods, [className])}
    >
      <div className={cnButton('AddonLeft')}>{addonLeft}</div>
      {props.children}
      <div className={cnButton('AddonRight')}>{addonRight}</div>
    </button>
  );
});
