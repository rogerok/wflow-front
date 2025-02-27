import { cn } from '@bem-react/classname';
import { ComponentPropsWithoutRef, ElementType, FC, ReactNode } from 'react';

import { Margin, Padding } from '../../../types';
import { Box } from '../Box/Box';

const cnPaper = cn('Paper');

type PaperElevation = 1 | 2 | 3 | 4 | 5 | 6;
type PaperRounded = 1 | 2 | 3 | 4 | 5 | 6;

interface PaperProps {
  className?: string;
  children?: ReactNode;
}

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

export const Paper: FC<PaperProps> = (props) => {
  return <Box className={cnPaper(undefined, [props.className])}>Paper</Box>;
};
