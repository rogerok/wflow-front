import { cn } from '@bem-react/classname';
import { GoalResponseType } from '@shared/api';
import { routes, UiTextConstant } from '@shared/const';
import { Button, ButtonLink, Flex } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { BookReportForm } from '../BookReportForm/BookReportForm';

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
        <BookReportForm goal={goal} />
        <Button fullWidth={isScreenDownMd} disabled>
          {UiTextConstant.edit('цель')}
        </Button>
        <ButtonLink
          to={routes.goal()}
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
