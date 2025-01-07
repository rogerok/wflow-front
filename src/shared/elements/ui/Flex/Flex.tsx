import './Flex.scss';

import { cn } from '@bem-react/classname';
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  ReactNode,
} from 'react';

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
  gap?: FlexGap;
  wrap?: FlexWrap;
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const Flex = <T extends ElementType = 'div'>(
  props: FlexProps<T>
): ReactElement => {
  const {
    align = 'start',
    children,
    className,
    direction = 'row',
    flexJustify = 'start',
    fullWidth = false,
    gap,
    as,
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
          gap: gap,
          justify: flexJustify,
          wrap: wrap,
        },
        [className]
      )}
      {...otherProps}
    >
      {children}
    </Component>
  );
};
