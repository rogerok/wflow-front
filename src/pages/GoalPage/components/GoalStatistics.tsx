import { cn } from '@bem-react/classname';
import { CssColorsVarsConstant } from '@shared/const';
import {
  Col,
  ElementRepeater,
  Grid,
  HStack,
  Paper,
  RadialStatistic,
  Row,
  Skeleton,
  Typography,
  VStack,
} from '@shared/elements/ui';
import { formatDate } from '@shared/lib';
import { RechartsProvider } from '@shared/providers';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useGoalContext } from '../model/hooks/useGoalContext';

const cnGoalStatistics = cn('GoalStatistics');

interface GoalStatisticsProps {
  className?: string;
}

const GoalStatisticsSkeleton: FC = () => {
  return (
    <Grid>
      <Row spacing={3} vSpacing={3}>
        <Col sm={12}>
          <Paper elevation={3} rounded={3} px={'16'} py={'16'} fullWidth>
            <VStack gap={'16'} pb={'16'}>
              <Skeleton count={3} />
            </VStack>
          </Paper>
        </Col>
        <ElementRepeater count={2}>
          <Col sm={12} md={6}>
            <Paper elevation={3} rounded={3} px={'16'} py={'16'} fullWidth>
              <HStack gap={'32'}>
                <Skeleton />
                <Skeleton variant={'circle'} width={10} height={10} />
              </HStack>
            </Paper>
          </Col>
        </ElementRepeater>

        <Col sm={12}>
          <Paper elevation={3} rounded={3} px={'16'} py={'16'} fullWidth>
            <HStack gap={'16'} flexJustify={'center'}>
              <Skeleton />
              <Skeleton variant={'circle'} width={10} height={10} />
            </HStack>
          </Paper>
        </Col>
      </Row>
    </Grid>
  );
};

export const GoalStatistics: FC<GoalStatisticsProps> = observer((props) => {
  const service = useGoalContext();

  const statistics = service.statistics;
  const goal = service.goal;

  if (service.isLoading) {
    return <GoalStatisticsSkeleton />;
  }

  return (
    statistics &&
    goal && (
      <RechartsProvider>
        <Grid className={cnGoalStatistics(undefined, [props.className])}>
          <Row spacing={3} vSpacing={3}>
            <Col sm={12}>
              <Paper elevation={3} rounded={3} px={'16'} py={'16'} fullWidth>
                <VStack gap={'16'} pb={'16'}>
                  <Typography as={'p'} weight={'semibold'}>
                    Дней с начала:{' '}
                    <Typography>{statistics.daysElapsed} </Typography>
                  </Typography>
                  <Typography as={'p'} weight={'semibold'}>
                    Дней до окончания:{' '}
                    <Typography>{statistics.daysRemaining} </Typography>
                  </Typography>
                  <Typography as={'p'} weight={'semibold'}>
                    Всего отчётов:{' '}
                    <Typography>{statistics.reportsCount} </Typography>
                  </Typography>
                  <Typography as={'p'} weight={'semibold'}>
                    Среднее количество слов за отчёт :{' '}
                    <Typography>{statistics.averageWordsPerReport} </Typography>
                  </Typography>

                  <Typography as={'p'} weight={'semibold'}>
                    Если вы продолжите в том же темпе, то закончите цель{' '}
                    <Typography>
                      {formatDate(statistics.estimatedEndDate)}{' '}
                    </Typography>
                  </Typography>
                </VStack>
              </Paper>
            </Col>

            <Col sm={12} md={6}>
              <Paper elevation={3} rounded={3} px={'16'} py={'16'}>
                <HStack>
                  <Typography weight={'semibold'}>Написано слов:</Typography>

                  <RadialStatistic
                    fill={CssColorsVarsConstant.BasicSecondary3}
                    value={goal.writtenWords}
                    domain={[0, goal.goalWords]}
                  />
                </HStack>
              </Paper>
            </Col>
            <Col sm={12} md={6}>
              <Paper elevation={3} rounded={3} px={'16'} py={'16'}>
                <HStack>
                  <Typography weight={'semibold'}>
                    Среднее количество слов в день:
                  </Typography>
                  <RadialStatistic
                    fill={
                      statistics.averageWordsPerDay < goal.wordsPerDay
                        ? CssColorsVarsConstant.Alert
                        : CssColorsVarsConstant.BrandSecondary
                    }
                    value={statistics.averageWordsPerDay}
                    domain={[0, goal.wordsPerDay]}
                  />
                </HStack>
              </Paper>
            </Col>
            <Col sm={12}>
              <Paper elevation={3} rounded={3} px={'16'} py={'16'}>
                <HStack>
                  <Typography weight={'semibold'}>
                    Процент выполнения цели
                  </Typography>
                  <RadialStatistic
                    fill={CssColorsVarsConstant.BrandPrimaryLight}
                    value={Math.round(statistics.percentageComplete)}
                  />
                </HStack>
              </Paper>
            </Col>
          </Row>
        </Grid>
      </RechartsProvider>
    )
  );
});
