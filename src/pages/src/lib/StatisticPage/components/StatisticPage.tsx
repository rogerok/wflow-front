import { FC } from 'react';
import { cn } from '@bem-react/classname';

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
