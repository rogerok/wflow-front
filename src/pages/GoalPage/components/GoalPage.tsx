import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import {
  ButtonLink,
  HStack,
  IconComponent,
  Page,
  PageSeo,
  Typography,
} from '@shared/elements/ui';
import { getRouteApi } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { GoalContext } from '../model/context/GoalContext';
import { GoalService } from '../model/services/GoalService';
import { GoalStatistics } from './GoalStatistics';

const cnGoalPage = cn('GoalPage');

interface GoalPageProps {
  className?: string;
}

const route = getRouteApi('/_protected/goals/$goalId');

export const GoalPage: FC<GoalPageProps> = observer((props) => {
  const goalId = route.useParams().goalId;
  const [service] = useState(() => new GoalService(goalId));

  const goal = service.goal;

  useEffect(() => {
    service.loadData();

    return () => {
      service.abortRequest();
    };
  }, [service]);

  return (
    <Page className={cnGoalPage(undefined, [props.className])}>
      <ButtonLink to={routes.goals()}>Назад</ButtonLink>
      <PageSeo title={goal?.title} />
      <GoalContext value={service}>
        <HStack
          as={'header'}
          align={'center'}
          gap={'32'}
          pb={'32'}
          flexJustify={'center'}
        >
          <Typography as={'h1'} size={'xl'} weight={'bold'}>
            {goal?.title}
          </Typography>
          <IconComponent name={'GoalIcon'} size={'lg'} />
        </HStack>
        <GoalStatistics />
      </GoalContext>
    </Page>
  );
});
