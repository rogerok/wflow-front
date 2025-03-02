import './Col.scss';

import { cn } from '@bem-react/classname';
import React, {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type BreakpointValues = Partial<Record<Breakpoint, ColSize>>;

type ColProps<T extends ElementType> = BreakpointValues & {
  children: React.ReactNode;
  className?: string;
  as?: T;
} & ComponentPropsWithoutRef<T>;

const colCn = cn('Col');

const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const Col = <T extends ElementType = 'div'>({
  children,
  className,
  as,
  ...breakpointProps
}: ColProps<T>): ReactElement => {
  const { classList } = breakpointOrder.reduce<{
    lastValue?: ColSize;
    classList: string[];
  }>(
    (acc, bp) => {
      const value = breakpointProps[bp] ?? acc.lastValue;
      if (value !== undefined) {
        acc.classList.push(`Col_${bp}_${value}`);
        acc.lastValue = value;
      }
      return acc;
    },
    { classList: [] },
  );

  const Component = as || 'div';

  return (
    <Component className={colCn(undefined, [...classList, className])}>
      {children}
    </Component>
  );
};
