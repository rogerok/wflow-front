import { cn } from '@bem-react/classname';
import { FC, ReactNode } from 'react';

import { VStack } from '../../VStack/VStack';

const cnCardContent = cn('CardContent');

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent: FC<CardContentProps> = (props) => {
  const { className, children } = props;

  return (
    <VStack className={cnCardContent(undefined, [className])} gap={'8'}>
      {children}
    </VStack>
  );
};
