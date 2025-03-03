import './Flex.scss';

import { cn } from '@bem-react/classname';
import { ComponentProps, ElementType, ReactElement, ReactNode } from 'react';

import {
  Alignment,
  FlexDirection,
  FlexGap,
  FlexWrap,
  Justify,
} from '../../../types/uiTypes/uiTypes';
import { Box } from '../Box/Box';

const cnFlex = cn('Flex');

export type FlexProps<T extends ElementType = 'div'> = ComponentProps<
  typeof Box<T>
> & {
  align?: Alignment;
  children?: ReactNode;
  className?: string;
  direction?: FlexDirection;
  flexJustify?: Justify;
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
