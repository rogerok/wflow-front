import './GoalsListItem.scss';

import { cn } from '@bem-react/classname';
import {
  Card,
  CardHeader,
  HStack,
  Typography,
  VStack,
} from '@shared/elements/ui';
import { formatDate } from '@shared/lib';
import { GoalResponseType } from '@shared/types';
import { FC } from 'react';

const cnGoalsListItem = cn('GoalsListItem');

interface GoalsListItemProps {
  data: GoalResponseType;
  className?: string;
}

export const GoalsListItem: FC<GoalsListItemProps> = (props) => {
  const { className, data } = props;

  return (
    <Card
      className={cnGoalsListItem(undefined, [className])}
      as={'li'}
      style={{
        background: 'var(--alert)',
      }}
    >
      <CardHeader title={data.title} />
      <VStack gap={'16'}>
        <Typography as={'p'}>{data.description}</Typography>
        <progress value={3000000} max={data.goalWords} />
        <Typography>
          {data.writtenWords} / {data.goalWords}
        </Typography>
        <HStack flexJustify={'between'} mt={'16'} as={'p'} gap={'8'}>
          <Typography>
            Дата создания: {formatDate(data.createdAt, true)}
          </Typography>
          <Typography>
            Дата начала: {formatDate(data.startDate, true)}
          </Typography>
          <Typography>
            Дата окончания: {formatDate(data.endDate, true)}
          </Typography>
        </HStack>
      </VStack>
    </Card>
  );
};
