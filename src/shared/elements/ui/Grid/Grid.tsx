import './Grid.scss';

import { cn } from '@bem-react/classname';
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  ReactNode,
} from 'react';

import { MarginPadding } from '../../../types/uiTypes/uiTypes';

const cnGrid = cn('Grid');

type GridProps<T extends ElementType> = {
  className?: string;
  children: ReactNode;
  as?: T;
  fullWidth?: boolean;
  fullHeight?: boolean;
  fluid?: boolean;
} & ComponentPropsWithoutRef<T> &
  MarginPadding;

export const Grid = <T extends ElementType = 'div'>(
  props: GridProps<T>,
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
    as = 'div',
    fullWidth,
    fullHeight,
  } = props;

  const Component = as || 'div';

  const mods = {
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
  };

  return (
    <Component className={cnGrid(mods, [className])}>{children}</Component>
  );
};
