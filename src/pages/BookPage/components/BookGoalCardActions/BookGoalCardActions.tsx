import { cn } from '@bem-react/classname';
import { GoalResponseType } from '@shared/api';
import { routes } from '@shared/const';
import { Button, ButtonLink, Flex } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { BookGoalForm } from '../BookGoalForm/BookGoalForm';

const cnBookGoalCardActions = cn('BookGoalCardActions');

interface BookGoalCardActionsProps {
  className?: string;
  goal: GoalResponseType;
}

export const BookGoalCardActions: FC<BookGoalCardActionsProps> = observer(
  (props) => {
    const { className, goal } = props;

    const { screen } = useGlobalStore();

    const isScreenDownMd = screen.downMd;

    return (
      <Flex
        className={cnBookGoalCardActions(undefined, [className])}
        gap={'16'}
        direction={screen.downLg ? 'column' : 'row'}
        mt={'16'}
      >
        <BookGoalForm goal={goal} />
        <Button fullWidth={isScreenDownMd} disabled>
          Редактировать цель
        </Button>
        <ButtonLink
          to={routes.reports()}
          variant={'outlined'}
          fullWidth={isScreenDownMd}
          disabled
        >
          Подробности
        </ButtonLink>
      </Flex>
    );
  },
);
