import { cn } from '@bem-react/classname';
import { Paper, Typography, VStack } from '@shared/elements/ui';
import { FC } from 'react';

const cnStatisticCard = cn('StatisticCard');

interface StatisticCardProps {
  className?: string;
  subtitle: string;
  title: string;
  value: number | string;
}

export const StatisticCard: FC<StatisticCardProps> = (props) => {
  const { subtitle, value, title, className } = props;
  return (
    <Paper
      className={cnStatisticCard(undefined, [className])}
      elevation={3}
      rounded={3}
      px={'16'}
      py={'16'}
      fullWidth
    >
      <VStack
        as={'p'}
        gap={'8'}
        align={'center'}
        flexJustify={'between'}
        fullHeight
      >
        <Typography weight={'semibold'}>{title}</Typography>
        <Typography variant={'accent'} size={'xl'}>
          {typeof value === 'string' ? value : Math.round(value)}
        </Typography>

        <Typography variant={'light'}>{subtitle}</Typography>
      </VStack>
    </Paper>
  );
};
