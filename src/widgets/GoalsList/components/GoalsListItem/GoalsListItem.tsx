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
  Modal,
  ProgressBar,
  Typography,
  VStack,
} from '@shared/elements/ui';
import { formatDate, useGlobalStore } from '@shared/lib';
import { useOpenClose } from '@shared/lib/hooks/useOpenClose';
import { GoalResponseType } from '@shared/types';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { ReportCreateForm } from '../../../ReportCreateForm';

const cnGoalsListItem = cn('GoalsListItem');

interface GoalsListItemProps {
  data: GoalResponseType;
  className?: string;
}

export const GoalsListItem: FC<GoalsListItemProps> = observer((props) => {
  const { className, data } = props;

  const { screen } = useGlobalStore();

  const isScreenDownMd = screen.downMd;

  const { open, handleOpen, handleClose } = useOpenClose();

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
        <Flex gap={'16'} direction={screen.downLg ? 'column' : 'row'} mt={'16'}>
          <Button onClick={handleOpen} fullWidth={isScreenDownMd}>
            Добавить отчёт
          </Button>
          <Modal fullScreen={isScreenDownMd} onClose={handleClose} open={open}>
            <ReportCreateForm goalId={data.id} bookId={data.bookId} />
          </Modal>
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
