import './GoalsPage.scss';

import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import { ButtonLink, Page, PageTitle } from '@shared/elements/ui';
import { GoalsService } from '@shared/services';
import { GoalsList } from '@widgets/GoalsList';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

const cnGoalsPage = cn('GoalsPage');

interface GoalsPageProps {
  className?: string;
}

export const GoalsPage: FC<GoalsPageProps> = observer((props) => {
  const [service] = useState(() => new GoalsService());

  useEffect(() => {
    service.list();

    return () => {
      service.abortRequest();
    };
  }, [service]);

  return (
    <Page className={cnGoalsPage(undefined, [props.className])}>
      <PageTitle title={'Мои цели'} />
      <ButtonLink to={routes.goalsCreate()}>Добавить цель</ButtonLink>

      <GoalsList data={service.data} className={cnGoalsPage('List')} />
    </Page>
  );
});
