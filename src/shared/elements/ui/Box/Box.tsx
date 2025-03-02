import './Box.scss';

import { cn } from '@bem-react/classname';
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  ReactNode,
} from 'react';

import { Margin, Padding } from '../../../types/uiTypes/uiTypes';

const cnBox = cn('Box');

export type BoxProps<T extends ElementType> = {
  className?: string;
  children?: ReactNode;
  as?: T;
  py?: Padding;
  px?: Padding;
  pt?: Padding;
  pr?: Padding;
  pb?: Padding;
  pl?: Padding;
  mx?: Margin;
  my?: Margin;
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
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    py,
    px,
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
          py: py,
          px: px,
          pt: pt,
          pr: pr,
          pb: pb,
          pl: pl,
          mx: mx,
          my: my,
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
