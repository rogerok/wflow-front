import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnStatisticPage = cn('StatisticPage');

interface StatisticPageProps {
  className?: string;
}

export const StatisticPage: FC<StatisticPageProps> = (props) => {
  return (
    <div className={cnStatisticPage(undefined, [props.className])}>
      StatisticPage
    </div>
  );
};
