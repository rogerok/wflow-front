import { cn } from '@bem-react/classname';
import { Page, PageSeo } from '@shared/elements/ui';
import { FC } from 'react';

const cnReportsPage = cn('ReportsPage');

interface ReportsPageProps {
  className?: string;
}

export const ReportsPage: FC<ReportsPageProps> = (props) => {
  return (
    <Page className={cnReportsPage(undefined, [props.className])}>
      <PageSeo title={'Мои отчёты'} />
    </Page>
  );
};
