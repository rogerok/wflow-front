import { cn } from '@bem-react/classname';
import { CssColorsVarsConstant } from '@shared/const';
import {
  Col,
  Grid,
  HStack,
  Paper,
  RadialStatistic,
  Row,
  Typography,
  VStack,
} from '@shared/elements/ui';
import { formatDate } from '@shared/lib';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { useGoalService } from '../model/hooks/useGoalService';

const cnGoalStatistics = cn('GoalStatistics');

interface GoalStatisticsProps {
  className?: string;
}

export const GoalStatistics: FC<GoalStatisticsProps> = observer((props) => {
  const service = useGoalService();

  const statistics = service.statistics;
  const goal = service.goal;

  return (
    statistics &&
    goal && (
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
    )
  );
});
