import { cn } from '@bem-react/classname';
import { ReportCreateForm } from '@widgets/ReportCreateForm';
import { FC } from 'react';

const cnReportsPage = cn('ReportsPage');

interface ReportsPageProps {
  className?: string;
}

export const ReportsPage: FC<ReportsPageProps> = (props) => {
  return (
    <div className={cnReportsPage(undefined, [props.className])}>
      <ReportCreateForm />
    </div>
  );
};
