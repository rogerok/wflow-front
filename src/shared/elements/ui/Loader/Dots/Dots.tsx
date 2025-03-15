import './Dots.scss';

import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnDots = cn('Dots');

interface DotsProps {
  className?: string;
}

export const Dots: FC<DotsProps> = (props) => {
  return (
    <div className={cnDots(undefined, [props.className])}>
      <div className={cnDots('Item')}></div>
      <div className={cnDots('Item')}></div>
      <div className={cnDots('Item')}></div>
    </div>
  );
};
