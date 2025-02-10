import './Button.scss';

import { cn } from '@bem-react/classname';
import { ComponentPropsWithoutRef, ElementType, memo, ReactNode } from 'react';

const cnButton = cn('Button');

type ButtonVariantsType = 'filled' | 'outlined' | 'clear';

type ButtonSizesType = 'sm' | 'md';

export type ButtonProps<T extends ElementType> = {
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  as?: T;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: ButtonSizesType;
  variant?: ButtonVariantsType;
} & ComponentPropsWithoutRef<T>;

export const Button = memo(
  <T extends ElementType = 'button'>(props: ButtonProps<T>): ReactNode => {
    const {
      addonLeft,
      addonRight,
      as,
      className,
      disabled,
      fullWidth,
      size = 'sm',
      type = 'button',
      variant = 'filled',
      ...otherProps
    } = props;

    const mods = {
      size: size,
      variant: variant,
      fullWidth: fullWidth,
      disabled: disabled,
    };

    const Component = as || 'button';

    return (
      <Component
        {...(as === 'button' ? { type: type } : {})}
        {...otherProps}
        disabled={disabled}
        className={cnButton(mods, [className])}
      >
        {addonLeft && <div className={cnButton('AddonLeft')}>{addonLeft}</div>}
        <span className={cnButton('Content')}>{props.children}</span>
        {addonRight && (
          <div className={cnButton('AddonRight')}>{addonRight}</div>
        )}
      </Component>
    );
  },
);
