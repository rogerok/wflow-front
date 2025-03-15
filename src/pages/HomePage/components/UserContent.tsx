import { cn } from '@bem-react/classname';
import { CssColorsVarsConstant } from '@shared/const';
import { Box, Col, Grid, Row, Typography } from '@shared/elements/ui';
import { formatDate } from '@shared/lib';
import { useGlobalStore } from '@shared/stores';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { HomePageService } from '../model/services/HomePageService';
import { StatisticCard } from './StatisticCard/StatisticCard';
import { StatisticCardRadial } from './StatisticCard/StatisticCardRadial';

const cnUserContent = cn('UserContent');

interface UserContentProps {
  className?: string;
}

export const UserContent: FC<UserContentProps> = observer((props) => {
  const { userService } = useGlobalStore();
  const [service] = useState(() => new HomePageService());

  const data = service.statisticsData;

  useEffect(() => {
    if (userService.isAuth) {
      service.fetchStatistics();
    }

    return () => {
      service.abortRequest();
    };
  }, [service, userService.isAuth]);

  return (
    userService.isAuth &&
    data && (
      <Grid className={cnUserContent(undefined, [props.className])} mt={'32'}>
        <Box as={'header'} mb={'32'}>
          <Typography
            as={'h2'}
            weight={'semibold'}
            size={'xl'}
            align={'center'}
          >
            Ваши результаты
          </Typography>
        </Box>

        <Row spacing={3} vSpacing={3}>
          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Общее количество слов'}
              value={data.totalWords}
              subtitle={'Общее количество слов, написанных вами за всё время.'}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Максимальное количество слов в день'}
              value={data.maxWordsInDay}
              subtitle={
                'Самое большое количество слов, которое вы написали в один день.'
              }
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Среднее количество слов в день'}
              value={data.averageWordsPerDay}
              subtitle={'Среднее количество слов, которые вы пишете ежедневно.'}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Среднее количество слов в отчёте'}
              value={data.averageWordsPerReport}
              subtitle={'Среднее количество слов в каждом отчёте.'}
            />
          </Col>

          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Общее количество книг'}
              value={data.totalBooks}
              subtitle={'Число книг, с которыми вы работали в процессе работы.'}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Общее количество целей'}
              value={data.totalGoals}
              subtitle={'Количество поставленных целей для написания текста.'}
            />
          </Col>

          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Завершенные цели'}
              value={data.completedGoals}
              subtitle={'Количество целей, которые вы успешно завершили.'}
            />
          </Col>

          <Col sm={12} md={6} lg={4}>
            <StatisticCardRadial
              title={'Процент прогресса по цели'}
              value={data.goalCompletionRate}
              fill={CssColorsVarsConstant.BrandPrimaryLight}
              subtitle={
                'Процент завершенных целей из общего числа установленных целей.'
              }
            />
          </Col>

          <Col sm={12} md={6} lg={4}>
            <StatisticCardRadial
              title={'Процент выполнения целей'}
              value={data.goalCompletionRate}
              fill={CssColorsVarsConstant.BrandSecondary}
              subtitle={'Процент выполненных целей от общего числа.'}
            />
          </Col>

          <Col sm={12} md={6} lg={4}>
            <StatisticCardRadial
              title={'Процент выполнения просроченных целей'}
              value={data.expiredGoalsCompletionRate}
              fill={CssColorsVarsConstant.BrandSecondaryLight}
              subtitle={'Процент завершенных целей, которые уже просрочены.'}
            />
          </Col>

          <Col sm={12} md={6} lg={4}>
            <StatisticCardRadial
              title={'Процент перевыполненных целей'}
              value={data.overachievementRate}
              fill={CssColorsVarsConstant.BrandAccent1}
              subtitle={
                'Процент целей, которые вы завершили, написав больше слов, чем требовалось.'
              }
            />
          </Col>

          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Общее количество отчётов'}
              value={data.totalReports}
              subtitle={
                'Общее количество отчётов о проделанной работе за все время.'
              }
            />
          </Col>

          <Col sm={12} md={6} lg={4}>
            <StatisticCardRadial
              title={' Процент отчётов выше среднего'}
              value={data.aboveAverageReportsRate}
              fill={CssColorsVarsConstant.BrandAccent2}
              subtitle={
                'Процент отчётов, в которых вы написали больше слов, чем в среднем по всем отчётам.'
              }
            />
          </Col>

          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Среднее количество дней для завершения'}
              value={data.averageDaysToComplete}
              subtitle={
                'Среднее количество дней, которые вам понадобились для выполнения цели.'
              }
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Самый продуктивный день'}
              value={formatDate(data.mostProductiveDay)}
              subtitle={
                'Дата, когда вы написали наибольшее количество слов за день.'
              }
            />
          </Col>

          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Текущая серия дней'}
              value={data.currentStreak}
              subtitle={'Количество дней подряд, в которые вы активно писали.'}
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Самая длинная серия дней'}
              value={data.longestStreak}
              subtitle={
                'Количество дней подряд, в которые вы активно писали за всё время.'
              }
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <StatisticCard
              title={'Общее количество дней с активностью'}
              value={data.totalDaysWithActivity}
              subtitle={
                'Количество дней, в которые вы активно работали над своими целями.'
              }
            />
          </Col>
          <Col sm={12} md={6} lg={4}>
            <StatisticCardRadial
              title={'Процент регулярности активности'}
              value={data.activityConsistencyRate}
              fill={CssColorsVarsConstant.BrandAccent3}
              subtitle={
                'Этот показатель показывает, как часто вы были активны относительно общего времени с начала работы.'
              }
            />
          </Col>
        </Row>
      </Grid>
    )
  );
});
