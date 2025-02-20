import './Card.scss';

import { cn } from '@bem-react/classname';
import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  ReactNode,
} from 'react';

const cnCard = cn('Card');

type CardProps<T extends ElementType> = {
  className?: string;
  children: ReactNode;
  as?: T;
} & ComponentPropsWithoutRef<T>;

export const Card = <T extends ElementType = 'div'>(
  props: CardProps<T>,
): ReactElement => {
  const { as, className, children } = props;

  const Component = as || 'div';

  return (
    <Component className={cnCard(undefined, [className])}>{children}</Component>
  );
};
