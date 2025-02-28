import './Row.scss';

import { cn } from '@bem-react/classname';
import { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react';

import {
  Alignment,
  Justify,
  MarginPadding,
} from '../../../types/uiTypes/uiTypes';

const cnRow = cn('Row');

type Spacing = 0 | 1 | 2 | 3 | 4 | 5;

type RowProps<T extends ElementType> = {
  alignment?: Alignment;
  justify?: Justify;
  spacing?: Spacing;
  vSpacing?: Spacing;
} & ComponentPropsWithoutRef<T> &
  MarginPadding;

export const Row = <T extends ElementType = 'div'>(
  props: RowProps<T>,
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
    gap,
    as = 'div',
    spacing,
    vSpacing,
    alignment,
    justify,
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
    gap: gap,
    [`spacing_${spacing}`]: !!spacing,
    [`vSpacing_${vSpacing}`]: !!vSpacing,
    [`align_${alignment}`]: !!alignment,
    [`justify_${justify}`]: !!justify,
  };

  return <Component className={cnRow(mods, [className])}>{children}</Component>;
};
