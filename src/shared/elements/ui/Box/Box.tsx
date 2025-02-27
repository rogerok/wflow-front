import './Box.scss';

import { cn } from '@bem-react/classname';
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  ReactNode,
} from 'react';

const cnBox = cn('Box');

export type Padding = '4' | '8' | '16' | '24' | '32';
export type Margin = '4' | '8' | '16' | '24' | '32' | 'auto';

export type BoxProps<T extends ElementType> = {
  className?: string;
  children?: ReactNode;
  as?: T;
  pt?: Padding;
  pr?: Padding;
  pb?: Padding;
  pl?: Padding;
  mt?: Margin;
  mr?: Margin;
  mb?: Margin;
  ml?: Margin;
  fullWidth?: boolean;
  fullHeight?: boolean;
} & ComponentPropsWithoutRef<T>;

export const Box = <T extends ElementType = 'div'>(
  props: BoxProps<T>,
): ReactElement => {
  const {
    children,
    className,
    mt,
    mr,
    mb,
    ml,
    pt,
    pr,
    pb,
    pl,
    as,
    fullWidth,
    fullHeight,
  } = props;

  const Component = as || 'div';

  return (
    <Component
      className={cnBox(
        {
          pt: pt,
          pr: pr,
          pb: pb,
          pl: pl,
          mt: mt,
          ml: ml,
          mb: mb,
          mr: mr,
          fullWidth: fullWidth,
          fullHeight: fullHeight,
        },
        [className],
      )}
    >
      {children}
    </Component>
  );
};
