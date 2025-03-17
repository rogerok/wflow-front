import './GoalsPage.scss';

import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import {
  ButtonLink,
  Card,
  ElementRepeater,
  HStack,
  NotFoundLabel,
  Page,
  PageSeo,
  Pagination,
  Skeleton,
  VStack,
} from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { GoalsList } from '@widgets/GoalsList';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { GoalsCardActions } from '../components/GoalsCardActions/GoalsCardActions';
import { GoalsContext } from '../model/context/GoalsContext';
import { GoalsPageFacade } from '../model/services/GoalsPageFacade';

const cnGoalsPage = cn('GoalsPage');

interface GoalsPageProps {
  className?: string;
}

const GoalsListSkeleton: FC = observer(() => {
  const { screen } = useGlobalStore();

  return (
    <div className={cnGoalsPage('List')}>
      <ElementRepeater count={6}>
        <Card>
          <VStack fullHeight>
            <VStack gap={'16'}>
              <Skeleton count={3} />
            </VStack>
            <HStack flexJustify={'between'} gap={'8'} py={'16'}>
              <Skeleton count={3} width={screen.downMd ? '100%' : '33%'} />
            </HStack>
          </VStack>
        </Card>
      </ElementRepeater>
    </div>
  );
});

export const GoalsPage: FC<GoalsPageProps> = observer((props) => {
  const [facade] = useState(() => new GoalsPageFacade());

  useEffect(() => {
    facade.fetchData();

    return () => {
      facade.abortRequest();
    };
  }, [facade]);

  return (
    <Page className={cnGoalsPage(undefined, [props.className])}>
      <PageSeo title={'Мои цели'} />
      <ButtonLink to={routes.goalsCreate()}>Добавить цель</ButtonLink>

      {facade.isLoading ? (
        <GoalsListSkeleton />
      ) : facade.goals.length ? (
        <GoalsContext value={facade}>
          <GoalsList
            className={cnGoalsPage('List')}
            data={facade.goals}
            actions={(goal) => <GoalsCardActions goal={goal} />}
          />
        </GoalsContext>
      ) : (
        <NotFoundLabel />
      )}

      <Pagination
        className={cnGoalsPage('Pagination')}
        service={facade.request}
      />
    </Page>
  );
});
