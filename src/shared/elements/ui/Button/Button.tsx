import './Button.scss';

import { cn } from '@bem-react/classname';
import { ButtonHTMLAttributes, FC, memo } from 'react';

const cnButton = cn('Button');

type ButtonVariantsType = 'filled' | 'outlined' | 'clear';

type ButtonSizesType = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  fullWidth?: boolean;
  size?: ButtonSizesType;
  variant?: ButtonVariantsType;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = memo((props) => {
  const {
    className,
    disabled,
    fullWidth,
    size = 'sm',
    variant = 'filled',
    ...otherProps
  } = props;

  const mods = {
    size: size,
    variant: variant,
    fullWidth: fullWidth,
  };

  return (
    <button
      type={'button'}
      {...otherProps}
      disabled={disabled}
      className={cnButton(mods, [className])}
    >
      {props.children}
    </button>
  );
});
