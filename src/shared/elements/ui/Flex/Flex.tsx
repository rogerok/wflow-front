import './Flex.scss';

import { cn } from '@bem-react/classname';
import { ComponentProps, ElementType, ReactElement, ReactNode } from 'react';

import { Box } from '../Box/Box';

const cnFlex = cn('Flex');

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'wrap' | 'nowrap';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

export type FlexProps<T extends ElementType = 'div'> = ComponentProps<
  typeof Box<T>
> & {
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
};

export const Flex = <T extends ElementType = 'div'>(
  props: FlexProps<T>,
): ReactElement => {
  const {
    align,
    children,
    className,
    direction = 'row',
    flexJustify = 'start',
    gap,
    as = 'div',
    wrap = 'wrap',
    ...otherProps
  } = props;

  return (
    <Box
      {...otherProps}
      as={as}
      className={cnFlex(
        {
          align: align,
          direction: direction,

          gap: gap,
          justify: flexJustify,
          wrap: wrap,
        },
        [className],
      )}
    >
      {children}
    </Box>
  );
};
