import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '@bem-react/classname';
import './Button.scss';

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

export const Button: FC<ButtonProps> = (props) => {
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
    disabled: disabled,
  };

  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={cnButton(mods, [className])}
    >
      {props.children}
    </button>
  );
};
