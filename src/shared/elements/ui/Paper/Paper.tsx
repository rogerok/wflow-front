import { cn } from '@bem-react/classname';
import { FC, ReactNode } from 'react';

const cnPaper = cn('Paper');

type PaperElevation = 1 | 2 | 3 | 4 | 5 | 6;
type PaperRounded = 1 | 2 | 3 | 4 | 5 | 6;

interface PaperProps {
  className?: string;
  children?: ReactNode;
}

export const Paper: FC<PaperProps> = (props) => {
  return <div className={cnPaper(undefined, [props.className])}>Paper</div>;
};
