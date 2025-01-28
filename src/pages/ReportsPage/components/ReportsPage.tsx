import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnReportsPage = cn('ReportsPage');

interface ReportsPageProps {
  className?: string;
}

export const ReportsPage: FC<ReportsPageProps> = (props) => {
  return (
    <div className={cnReportsPage(undefined, [props.className])}>
      ReportsPage
    </div>
  );
};