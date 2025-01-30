import './Button.scss';

import { cn } from '@bem-react/classname';
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

const cnButton = cn('Button');

type ButtonVariantsType = 'filled' | 'outlined' | 'clear';

type ButtonSizesType = 'sm' | 'md';

export type ButtonProps<T extends ElementType> = {
  className?: string;
  fullWidth?: boolean;
  size?: ButtonSizesType;
  variant?: ButtonVariantsType;
  disabled?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T>,
): ReactNode => {
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

  const Component = props.as || 'button';

  return (
    <Component
      type={'button'}
      {...otherProps}
      disabled={disabled}
      className={cnButton(mods, [className])}
    >
      <div className={cnButton('AddonLeft')}>{addonLeft}</div>
      {props.children}
      <div className={cnButton('AddonRight')}>{addonRight}</div>
    </Component>
  );
};
