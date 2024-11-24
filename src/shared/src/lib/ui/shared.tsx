import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnShared = cn('Shared');

interface SharedProps {
  className?: string;
}

export const Shared: FC<SharedProps> = (props) => {
  return <div className={cnShared(undefined, [props.className])}>Shared</div>;
};
