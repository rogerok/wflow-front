import { cn } from '@bem-react/classname';
import { Page, PageTitle } from '@shared/elements/ui';
import { getRouteApi } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { GoalContext } from '../model/context/GoalContext';
import { GoalService } from '../model/services/GoalService';
import { GoalAbout } from './GoalAbout';
import { GoalStatistics } from './GoalStatistics';

const cnGoalPage = cn('GoalPage');

interface GoalPageProps {
  className?: string;
}

const route = getRouteApi('/_protected/goals/$goalId');

export const GoalPage: FC<GoalPageProps> = observer((props) => {
  const [service] = useState(() => new GoalService());
  const params = route.useParams();

  const goal = service.goal;

  useEffect(() => {
    service.loadData(params.goalId);

    return () => {
      service.abortRequest();
    };
  }, [params.goalId, service]);

  return (
    <Page className={cnGoalPage(undefined, [props.className])}>
      <PageTitle title={goal?.title} />
      <GoalContext value={service}>
        <GoalAbout />
        <GoalStatistics />
      </GoalContext>
    </Page>
  );
});
