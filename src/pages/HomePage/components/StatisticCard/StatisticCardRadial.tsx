import { cn } from '@bem-react/classname';
import { Paper, RadialStatistic, Typography } from '@shared/elements/ui';
import { ComponentProps, FC } from 'react';

const cnStatisticCardRadial = cn('StatisticCardRadial');

interface StatisticCardRadialProps
  extends Omit<ComponentProps<typeof RadialStatistic>, 'className'> {
  className?: string;
  title: string;
  subtitle: string;
}

export const StatisticCardRadial: FC<StatisticCardRadialProps> = (props) => {
  const { title, className, subtitle, fill, value } = props;

  return (
    <Paper
      elevation={3}
      rounded={3}
      px={'16'}
      py={'16'}
      className={cnStatisticCardRadial(undefined, [className])}
    >
      <Typography weight={'semibold'}>{title}</Typography>{' '}
      <RadialStatistic value={value} fill={fill} />
      <Typography variant={'light'}>{subtitle}</Typography>
    </Paper>
  );
};
