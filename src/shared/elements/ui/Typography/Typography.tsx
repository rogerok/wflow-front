import './Typography.scss';

import { cn } from '@bem-react/classname';
import { ComponentPropsWithoutRef, ElementType, memo, ReactNode } from 'react';

const cnTypography = cn('Typography');

type TypographyVariants = 'primary' | 'secondary' | 'light' | 'accent' | 'warn';
type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TypographyWeight = 'normal' | 'semibold' | 'bold';
type TypographyAlign = 'left' | 'center' | 'right';

type TypographyProps<T extends ElementType> = {
  children: ReactNode;
  as?: T;
  className?: string;
  size?: TypographySize;
  variant?: TypographyVariants;
  weight?: TypographyWeight;
  align?: TypographyAlign;
} & ComponentPropsWithoutRef<T>;

export const Typography = memo(
  <T extends ElementType = 'span'>(props: TypographyProps<T>): ReactNode => {
    const {
      children,
      as,
      className,
      size,
      variant = 'primary',
      weight = 'normal',
      align = 'left',
      ...restProps
    } = props;

    const mods = {
      size: size,
      variant: variant,
      weight: weight,
      align: align,
    };

    const Component = as || 'span';

    return (
      <Component className={cnTypography(mods, [className])} {...restProps}>
        {children}
      </Component>
    );
  },
);
