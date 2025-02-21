import './GoalsListItem.scss';

import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import {
  Button,
  ButtonLink,
  Card,
  CardHeader,
  Flex,
  HStack,
  Typography,
  VStack,
} from '@shared/elements/ui';
import { ProgressBar } from '@shared/elements/ui/ProgressBar/ProgressBar';
import { formatDate } from '@shared/lib';
import { useGlobalStore } from '@shared/stores';
import { GoalResponseType } from '@shared/types';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const cnGoalsListItem = cn('GoalsListItem');

interface GoalsListItemProps {
  data: GoalResponseType;
  className?: string;
}

export const GoalsListItem: FC<GoalsListItemProps> = observer((props) => {
  const { className, data } = props;

  const { screen } = useGlobalStore();

  const isScreenDownMd = screen.downMd;

  return (
    <Card className={cnGoalsListItem(undefined, [className])} as={'li'}>
      <CardHeader title={data.title} />
      <VStack gap={'16'}>
        <Typography as={'p'}>{data.description}</Typography>
        <VStack fullWidth>
          <Typography>
            Чтобы успеть в срок, вам стоит писать около {data.wordsPerDay} слов
            ежедневно.
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
        <Flex gap={'16'} direction={screen.downLg ? 'column' : 'row'} mt={'16'}>
          <Button fullWidth={isScreenDownMd}>Добавить отчёт</Button>
          <Button fullWidth={isScreenDownMd}>Редактировать цель</Button>
          <ButtonLink
            to={routes.reports()}
            variant={'outlined'}
            fullWidth={isScreenDownMd}
          >
            Подробности
          </ButtonLink>
        </Flex>
        <Button
          className={cnGoalsListItem('DeleteButton')}
          variant={'warn'}
          size={'sm'}
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
