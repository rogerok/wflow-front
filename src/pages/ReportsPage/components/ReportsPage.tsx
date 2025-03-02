import { cn } from '@bem-react/classname';
import { Page, PageTitle } from '@shared/elements/ui';
import { FC } from 'react';

const cnReportsPage = cn('ReportsPage');

interface ReportsPageProps {
  className?: string;
}

export const ReportsPage: FC<ReportsPageProps> = (props) => {
  return (
    <Page className={cnReportsPage(undefined, [props.className])}>
      <PageTitle title={'Мои отчёты'} />
    </Page>
  );
};
