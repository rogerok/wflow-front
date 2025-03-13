import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnStatisticCardRadial = cn('StatisticCardRadial');

interface StatisticCardRadialProps {
  className?: string;
}

export const StatisticCardRadial: FC<StatisticCardRadialProps> = (props) => {
  return (
    <div className={cnStatisticCardRadial(undefined, [props.className])}>
      StatisticCardRadial
    </div>
  );
};