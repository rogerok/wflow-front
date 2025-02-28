import './Paper.scss';

import { cn } from '@bem-react/classname';
import { ComponentProps, ElementType, FC, ReactNode } from 'react';

import { Box } from '../Box/Box';

const cnPaper = cn('Paper');

type PaperElevation = 1 | 2 | 3 | 4 | 5 | 6;
type PaperRounded = 1 | 2 | 3 | 4 | 5 | 6;

export type PaperProps<T extends ElementType = 'div'> = ComponentProps<
  typeof Box<T>
> & {
  className?: string;
  children?: ReactNode;
  elevation?: PaperElevation;
  rounded?: PaperRounded;
};

export const Paper: FC<PaperProps> = (props) => {
  const { className, children, elevation, rounded } = props;

  return (
    <Box
      {...props}
      className={cnPaper(
        {
          elevation: elevation,
          rounded: rounded,
        },
        [className],
      )}
    >
      {children}
    </Box>
  );
};
