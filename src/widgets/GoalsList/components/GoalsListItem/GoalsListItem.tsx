import './GoalsListItem.scss';

import { cn } from '@bem-react/classname';
import { UiTextConstant } from '@shared/const';
import {
  Button,
  Card,
  CardHeader,
  HStack,
  ProgressBar,
  Typography,
  VStack,
} from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import { GoalModel } from '../../models/Goal';

const cnGoalsListItem = cn('GoalsListItem');

interface GoalsListItemProps {
  goal: GoalModel;
  className?: string;
  actions?: ReactNode;
}

export const GoalsListItem: FC<GoalsListItemProps> = observer((props) => {
  const { className, goal, actions } = props;

  return (
    <VStack className={cnGoalsListItem(undefined, [className])} as={'li'}>
      <Card className={cnGoalsListItem('Card')}>
        <CardHeader title={goal.data.title} />
        <Typography as={'p'}>{goal.data.description}</Typography>
        <VStack fullWidth mt={'auto'}>
          {!goal.data.isFinished && !goal.data.isExpired && (
            <Typography>
              Чтобы успеть в срок, вам стоит писать около {goal.wordsPerDay}{' '}
              слов ежедневно.
            </Typography>
          )}
          {goal.localizedRemainingDays && (
            <Typography>{goal.localizedRemainingDays}</Typography>
          )}

          <Typography variant={'accent'} weight={'semibold'}>
            Текущий прогресс
          </Typography>
          <HStack mt={'8'} flexJustify={'between'}>
            <Typography weight={'semibold'}>
              {goal.data.writtenWords}
            </Typography>
            <Typography weight={'semibold'}>{goal.data.goalWords}</Typography>
          </HStack>
          <ProgressBar
            className={cnGoalsListItem('ProgressBar')}
            value={goal.data.writtenWords}
            max={goal.data.goalWords}
          />
        </VStack>
        {actions}
        <Button
          className={cnGoalsListItem('DeleteButton')}
          variant={'warn'}
          size={'sm'}
          disabled
        >
          {UiTextConstant.delete()}
        </Button>
        <HStack flexJustify={'between'} as={'p'} gap={'8'} py={'16'}>
          <Typography variant={'light'}>
            Создано: {goal.formattedCreatedDate}
          </Typography>
          <Typography variant={'light'}>
            Начало: {goal.formattedStartDate}
          </Typography>
          <Typography variant={'light'}>
            Дедлайн: {goal.formattedEndDate}
          </Typography>
        </HStack>
      </Card>
    </VStack>
  );
});
