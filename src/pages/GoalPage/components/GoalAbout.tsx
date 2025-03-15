import { cn } from '@bem-react/classname';
import { HStack, IconComponent, Typography } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useGoalService } from '../model/hooks/useGoalService';

const cnGoalAbout = cn('GoalAbout');

interface GoalAboutProps {
  className?: string;
}

export const GoalAbout: FC<GoalAboutProps> = observer((props) => {
  const service = useGoalService();
  const goal = service.goal;

  return (
    <HStack
      className={cnGoalAbout(undefined, [props.className])}
      as={'header'}
      align={'center'}
      gap={'32'}
      flexJustify={'center'}
    >
      <Typography as={'h1'} size={'xl'} weight={'bold'}>
        {goal?.title}
      </Typography>
      <IconComponent name={'GoalIcon'} size={'lg'} />
    </HStack>
  );
});
