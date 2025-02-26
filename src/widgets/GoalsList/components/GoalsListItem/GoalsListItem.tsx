import './GoalsListItem.scss';

import { cn } from '@bem-react/classname';
import { GoalResponseType } from '@shared/api';
import {
  Button,
  Card,
  CardHeader,
  HStack,
  ProgressBar,
  Typography,
  VStack,
} from '@shared/elements/ui';
import { formatDate } from '@shared/lib';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

const cnGoalsListItem = cn('GoalsListItem');

interface GoalsListItemProps {
  data: GoalResponseType;
  className?: string;
  actions?: ReactNode;
}

export const GoalsListItem: FC<GoalsListItemProps> = observer((props) => {
  const { className, data, actions } = props;

  return (
    <Card className={cnGoalsListItem(undefined, [className])} as={'li'}>
      <CardHeader title={data.title} />
      <VStack gap={'16'}>
        <Typography as={'p'}>{data.description}</Typography>
        <VStack fullWidth>
          <Typography>
            Чтобы успеть в срок, вам стоит писать около{' '}
            {Math.round(data.wordsPerDay)} слов ежедневно.
          </Typography>

          <Typography variant={'accent'} weight={'semibold'}>
            Текущий прогресс
          </Typography>
          <HStack gap={'16'} flexJustify={'between'} mt={'8'}>
            <Typography weight={'semibold'}>{data.writtenWords}</Typography>
            <Typography weight={'semibold'}>{data.goalWords}</Typography>
          </HStack>
          <ProgressBar
            className={cnGoalsListItem('ProgressBar')}
            value={data.writtenWords}
            max={data.goalWords}
          />
        </VStack>
        {actions}
        <Button
          className={cnGoalsListItem('DeleteButton')}
          variant={'warn'}
          size={'sm'}
          disabled
        >
          Удалить
        </Button>
        <HStack flexJustify={'between'} mt={'16'} as={'p'} gap={'8'}>
          <Typography variant={'light'}>
            Создано: {formatDate(data.createdAt, true)}
          </Typography>
          <Typography variant={'light'}>
            Начало: {formatDate(data.startDate, true)}
          </Typography>
          <Typography variant={'light'}>
            Дедлайн: {formatDate(data.endDate, true)}
          </Typography>
        </HStack>
      </VStack>
    </Card>
  );
});
