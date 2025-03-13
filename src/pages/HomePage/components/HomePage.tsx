import { cn } from '@bem-react/classname';
import { CssColorsVarsConstant } from '@shared/const';
import { Col, Grid, Page, Paper, Row, Typography } from '@shared/elements/ui';
import { formatDate } from '@shared/lib';
import { Quotes } from '@widgets/Quotes';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { HomePageService } from '../models/services/HomePageService';
import { RadialStatistic } from './RadialStatistic';
import { StatisticCard } from './StatisticCard/StatisticCard';

const cnHomePage = cn('HomePage');

interface HomePageProps {
  className?: string;
}

export const HomePage: FC<HomePageProps> = observer((props) => {
  const [service] = useState(() => new HomePageService());

  const data = service.statisticsData;

  useEffect(() => {
    service.fetchStatistics();
  }, [service]);

  return (
    data && (
      <Page className={cnHomePage(undefined, [props.className])}>
        <Typography
          weight={'bold'}
          size={'xl'}
          align={'center'}
          fullWidth
          as={'h1'}
        >
          Word Flow — дневник автора
        </Typography>
        <Quotes />
        <Grid>
          <Typography
            as={'h2'}
            align={'center'}
            weight={'semibold'}
            size={'xl'}
          >
            Ваши результаты
          </Typography>
          <Row spacing={3} vSpacing={3}>
            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Общее количество слов'}
                value={data.totalWords}
                subtitle={
                  'Общее количество слов, написанных вами за всё время.'
                }
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Максимальное количество слов в день'}
                value={data.maxWordsInDay}
                subtitle={
                  'Самое большое количество слов, которое вы написали в один день.'
                }
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Среднее количество слов в день'}
                value={data.averageWordsPerDay}
                subtitle={
                  'Среднее количество слов, которые вы пишете ежедневно.'
                }
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Среднее количество слов в отчете'}
                value={data.averageWordsPerReport}
                subtitle={'Среднее количество слов в каждом отчете.'}
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Общее количество книг'}
                value={data.totalBooks}
                subtitle={
                  'Число книг, с которыми вы работали в процессе работы.'
                }
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Общее количество целей'}
                value={data.totalGoals}
                subtitle={'Количество поставленных целей для написания текста.'}
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <Paper elevation={3} rounded={3} py={'16'} px={'16'}>
                <Typography align={'center'} fullWidth>
                  Процент выполнения целей
                </Typography>
                <RadialStatistic
                  name={'Процент выполнения целей'}
                  value={data.goalCompletionRate}
                  fill={CssColorsVarsConstant.Alert}
                />
                <Typography align={'center'} fullWidth>
                  Процент выполненных целей от общего числа.
                </Typography>
              </Paper>
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Завершенные цели'}
                value={data.completedGoals}
                subtitle={'Количество целей, которые вы успешно завершили.'}
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Общее количество отчетов'}
                value={data.totalReports}
                subtitle={
                  'Общее количество отчетов о проделанной работе за все время.'
                }
              />
            </Col>

            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Среднее количество дней для завершения'}
                value={data.averageDaysToComplete}
                subtitle={
                  'Среднее количество дней, которые вам понадобились для выполнения цели.'
                }
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Самый продуктивный день'}
                value={formatDate(data.mostProductiveDay)}
                subtitle={
                  'Дата, когда вы написали наибольшее количество слов за день.'
                }
              />
            </Col>

            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Текущая серия дней'}
                value={data.currentStreak}
                subtitle={
                  'Количество дней подряд, в которые вы активно писали.'
                }
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Самая длинная серия дней'}
                value={data.longestStreak}
                subtitle={
                  'Количество дней подряд, в которые вы активно писали за всё время.'
                }
              />
            </Col>
            <Col sm={12} md={6} lg={4} xl={3}>
              <StatisticCard
                title={'Общее количество дней с активностью'}
                value={data.totalDaysWithActivity}
                subtitle={
                  'Количество дней, в которые вы активно работали над своими целями.'
                }
              />
            </Col>
          </Row>

          <Paper elevation={3} rounded={3} py={'16'}>
            <RadialStatistic
              name={'Процент регулярности активности'}
              value={data.activityConsistencyRate}
              fill={CssColorsVarsConstant.Alert}
            />
            <Typography align={'center'} fullWidth>
              Этот показатель показывает, как часто вы были активны относительно
              общего времени с начала работы.
            </Typography>
          </Paper>

          <Paper elevation={3} rounded={3} py={'16'}>
            <RadialStatistic
              name={'Процент прогресса по цели'}
              value={data.goalCompletionRate}
              fill={CssColorsVarsConstant.Alert}
            />
            <Typography align={'center'} fullWidth>
              Процент выполнения общей цели, с учетом написанных и оставшихся
              слов.
            </Typography>
          </Paper>

          <Paper elevation={3} rounded={3} py={'16'}>
            <RadialStatistic
              name={'Процент выполнения просроченных целей'}
              value={data.expiredGoalsCompletionRate}
              fill={CssColorsVarsConstant.Alert}
            />
            <Typography align={'center'} fullWidth>
              Процент завершенных целей, которые уже просрочены.
            </Typography>
          </Paper>

          <Paper elevation={3} rounded={3} py={'16'}>
            <RadialStatistic
              name={'Процент перевыполненных целей'}
              value={data.overachievementRate}
              fill={CssColorsVarsConstant.Alert}
            />
            <Typography align={'center'} fullWidth>
              Процент целей, которые вы завершили, написав больше слов, чем
              требовалось.
            </Typography>
          </Paper>

          <Paper elevation={3} rounded={3} py={'16'}>
            <RadialStatistic
              name={' Процент отчетов выше среднего'}
              value={data.aboveAverageReportsRate}
              fill={CssColorsVarsConstant.Alert}
            />
            <Typography align={'center'} fullWidth>
              Процент отчетов, в которых вы написали больше слов, чем в среднем
              по всем отчетам.
            </Typography>
          </Paper>
        </Grid>
      </Page>
    )
  );
});
