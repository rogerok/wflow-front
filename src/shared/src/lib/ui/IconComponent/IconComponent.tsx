import { FC } from 'react';
import { cn } from '@bem-react/classname';

const cnIconComponent = cn('IconComponent');

interface IconComponentProps {
  className?: string;
}

export const IconComponent: FC<IconComponentProps> = (props) => {
  return (
    <div className={cnIconComponent(undefined, [props.className])}>
      IconComponent
    </div>
  );
};
