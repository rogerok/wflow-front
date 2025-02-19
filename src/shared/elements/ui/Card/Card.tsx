import './Card.scss';

import { cn } from '@bem-react/classname';
import { FC, ReactNode } from 'react';

const cnCard = cn('Card');

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card: FC<CardProps> = (props) => {
  const { className, children } = props;

  return <div className={cnCard(undefined, [className])}>{children}</div>;
};
