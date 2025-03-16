import { cn } from '@bem-react/classname';
import { GoalResponseType } from '@shared/api';
import { routes, UiTextConstant } from '@shared/const';
import { Button, ButtonLink, Flex } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { GoalsPageReportForm } from '../GoalsReportForm/GoalsPageReportForm';

const cnGoalsCardActions = cn('GoalsCardActions');

interface GoalsCardActionsProps {
  className?: string;
  goal: GoalResponseType;
}

export const GoalsCardActions: FC<GoalsCardActionsProps> = observer((props) => {
  const { className, goal } = props;

  const { screen } = useGlobalStore();

  const isScreenDownMd = screen.downMd;

  return (
    <Flex
      className={cnGoalsCardActions(undefined, [className])}
      gap={'16'}
      direction={screen.downLg ? 'column' : 'row'}
      my={'16'}
    >
      <GoalsPageReportForm goal={goal} />
      <Button fullWidth={isScreenDownMd} disabled>
        {UiTextConstant.edit('цель')}
      </Button>
      <ButtonLink
        to={routes.goal()}
        params={{ goalId: goal.id }}
        variant={'outlined'}
        fullWidth={isScreenDownMd}
      >
        Подробности
      </ButtonLink>
    </Flex>
  );
});
