import './GoalsPage.scss';

import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import { ButtonLink, Page, PageSeo } from '@shared/elements/ui';
import { GoalsList } from '@widgets/GoalsList';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { GoalsContext } from '../model/context/GoalsContext';
import { GoalsPageFacade } from '../model/services/GoalsPageFacade';
import { GoalsCardActions } from './GoalsCardActions/GoalsCardActions';

const cnGoalsPage = cn('GoalsPage');

interface GoalsPageProps {
  className?: string;
}

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
      <GoalsContext value={facade}>
        <GoalsList
          className={cnGoalsPage('List')}
          data={facade.goals}
          actions={(goal) => <GoalsCardActions goal={goal} />}
        />
      </GoalsContext>
    </Page>
  );
});
