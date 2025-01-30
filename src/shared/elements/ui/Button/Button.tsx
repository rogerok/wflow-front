import './Button.scss';

import { cn } from '@bem-react/classname';
import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementType,
  memo,
  ReactNode,
} from 'react';

const cnButton = cn('Button');

type ButtonVariantsType = 'filled' | 'outlined' | 'clear';

type ButtonSizesType = 'sm' | 'md';

export type ButtonBaseProps = {
  className?: string;
  fullWidth?: boolean;
  size?: ButtonSizesType;
  variant?: ButtonVariantsType;
  disabled?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
};

export type ButtonProps<T extends ElementType = 'button'> = {
  component?: T;
} & ButtonBaseProps &
  (T extends 'button'
    ? ButtonHTMLAttributes<HTMLButtonElement>
    : Omit<ComponentPropsWithoutRef<T>, keyof ButtonBaseProps>); //

export const Button = memo(
  <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
    const {
      className,
      disabled,
      fullWidth,
      size = 'sm',
      variant = 'filled',
      addonLeft,
      addonRight,
      component,
      ...otherProps
    } = props;

    const mods = {
      size: size,
      variant: variant,
      fullWidth: fullWidth,
      disabled: disabled,
    };

    const Component = component || 'button';

    return (
      <Component
        {...(Component === 'button' ? { type: 'button' } : {})}
        {...otherProps}
        disabled={disabled}
        className={cnButton(mods, [className])}
      >
        <div className={cnButton('AddonLeft')}>{addonLeft}</div>
        {props.children}
        <div className={cnButton('AddonRight')}>{addonRight}</div>
      </Component>
    );
  },
);
