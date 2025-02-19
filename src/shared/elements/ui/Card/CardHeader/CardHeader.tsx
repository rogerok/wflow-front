import { cn } from '@bem-react/classname';
import { FC, ReactNode } from 'react';

import { Typography } from '../../Typography/Typography';
import { VStack } from '../../VStack/VStack';

const cnCardHeader = cn('CardHeader');

interface CardHeaderProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

export const CardHeader: FC<CardHeaderProps> = (props) => {
  const { className, title, subtitle } = props;

  return (
    <VStack gap={'8'}>
      <Typography
        className={cnCardHeader(undefined, [className])}
        align={'center'}
        children={title}
        fullWidth
        size={'l'}
        weight={'bold'}
      />
      <Typography
        className={cnCardHeader(undefined, [className])}
        align={'center'}
        children={subtitle}
        fullWidth
        weight={'semibold'}
      />
    </VStack>
  );
};
