import './Flex.scss';

import { cn } from '@bem-react/classname';
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  ReactNode,
} from 'react';

import { Margin, Padding } from '../../../types';

const cnFlex = cn('Flex');

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'wrap' | 'nowrap';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

export type FlexProps<T extends ElementType> = {
  align?: FlexAlign;
  children?: ReactNode;
  className?: string;
  direction?: FlexDirection;
  flexJustify?: FlexJustify;
  fullWidth?: boolean;
  fullHeight?: boolean;
  gap?: FlexGap;
  wrap?: FlexWrap;
  as?: T;
  pt?: Padding;
  pr?: Padding;
  pb?: Padding;
  pl?: Padding;
  mt?: Margin;
  mr?: Margin;
  mb?: Margin;
  ml?: Margin;
} & ComponentPropsWithoutRef<T>;

export const Flex = <T extends ElementType = 'div'>(
  props: FlexProps<T>,
): ReactElement => {
  const {
    align,
    children,
    className,
    direction = 'row',
    flexJustify = 'start',
    fullWidth = false,
    fullHeight = false,
    gap,
    as,
    mt,
    mr,
    mb,
    ml,
    pt,
    pr,
    pb,
    pl,
    wrap = 'wrap',
    ...otherProps
  } = props;

  const Component = as || 'div';

  return (
    <Component
      className={cnFlex(
        {
          align: align,
          direction: direction,
          fullWidth: fullWidth,
          fullHeight: fullHeight,
          gap: gap,
          justify: flexJustify,
          wrap: wrap,
          pt: pt,
          pr: pr,
          pb: pb,
          pl: pl,
          mt: mt,
          ml: ml,
          mb: mb,
          mr: mr,
        },
        [className],
      )}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
