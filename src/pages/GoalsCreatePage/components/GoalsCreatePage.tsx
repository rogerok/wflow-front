import { cn } from '@bem-react/classname';
import { Page, PageSeo } from '@shared/elements/ui';
import { FC } from 'react';

import { GoalsCreateForm } from './GoalsCreateForm/GoalsCreateForm';

const cnGoalsCreatePage = cn('GoalsCreatePage');

interface GoalsCreatePageProps {
  className?: string;
}

export const GoalsCreatePage: FC<GoalsCreatePageProps> = (props) => {
  return (
    <Page className={cnGoalsCreatePage(undefined, [props.className])}>
      <PageSeo title={'Добавить цель'} />
      <GoalsCreateForm />
    </Page>
  );
};
