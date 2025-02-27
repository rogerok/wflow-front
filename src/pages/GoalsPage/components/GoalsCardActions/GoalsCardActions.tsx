import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import { Button, ButtonLink, Flex } from '@shared/elements/ui';
import { useGlobalStore } from '@shared/stores';
import { FC } from 'react';

const cnGoalsCardActions = cn('GoalsCardActions');

interface GoalsCardActionsProps {
  className?: string;
}

export const GoalsCardActions: FC<GoalsCardActionsProps> = (props) => {
  const { screen } = useGlobalStore();

  const isScreenDownMd = screen.downMd;

  return (
    <Flex
      className={cnGoalsCardActions(undefined, [props.className])}
      gap={'16'}
      direction={screen.downLg ? 'column' : 'row'}
      mt={'16'}
    >
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
};
