import { cn } from '@bem-react/classname';
import { GoalCompletionType } from '@shared/api';
import { CssColorsVarsConstant } from '@shared/const';
import { Paper, Typography, VStack } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import {
  Bar,
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useStatisticsService } from '../model/hooks/useStatisticsService';

const cnStatisticGoalCompletion = cn('StatisticGoalCompletion');

interface StatisticGoalCompletionProps {
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: GoalCompletionType;
  }[];
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Paper elevation={3} rounded={3} py={'16'} px={'16'}>
        <VStack>
          <VStack>
            <Typography size={'sm'}>Книга: {data.bookTitle}</Typography>
            <Typography size={'sm'}>Цель: {data.goalTitle}</Typography>
            <Typography size={'sm'}>
              Выполнено: {Math.round(data.percentageComplete)}%
            </Typography>
            <Typography size={'sm'}>
              Кол-во отчётов: {data.reportsCount}
            </Typography>
            <Typography size={'sm'}>
              Осталось слов: {data.remainingWords}
            </Typography>
            <Typography size={'sm'}>
              Дневная цель: {Math.round(data.dailyWordsRequired)}
            </Typography>
            <Typography size={'sm'}>
              Осталось дней: {data.daysRemaining}
            </Typography>
          </VStack>
        </VStack>
      </Paper>
    );
  }
  return null;
};

export const StatisticGoalCompletion: FC<StatisticGoalCompletionProps> =
  observer((props) => {
    const service = useStatisticsService();

    return (
      <div className={cnStatisticGoalCompletion(undefined, [props.className])}>
        <ResponsiveContainer width={'100%'} height={500}>
          <ComposedChart data={service.goalsCompetition}>
            <CartesianGrid
              strokeDasharray={'3 3'}
              stroke={`var(--${CssColorsVarsConstant.GraphGrid})`}
            />

            <XAxis
              fontSize={'1rem'}
              dataKey={'goalTitle'}
              stroke={`var(--${CssColorsVarsConstant.AxisLine})`}
            />
            <Brush
              dataKey={'goalTitle'}
              height={30}
              stroke={`var(--${CssColorsVarsConstant.GraphBrush})`}
            />
            <YAxis
              fontSize={'1rem'}
              stroke={`var(--${CssColorsVarsConstant.AxisLine})`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend verticalAlign={'top'} align={'center'} />

            {/*  Percentage Complete as the bar chart */}
            <Bar
              dataKey={'percentageComplete'}
              fill={`var(--${CssColorsVarsConstant.GraphLinePrimary})`}
              name={'Процент выполнения'}
              barSize={20}
            />

            {/* Remaining Words as the scatter plot */}
            <Scatter
              dataKey={'remainingWords'}
              fill={`var(--${CssColorsVarsConstant.GraphLineSecondary})`}
              name={'Осталось слов'}
              shape={'circle'}
            />

            {/* Daily Words Goal as the line chart */}
            <Line
              type={'monotone'}
              dataKey={'dailyWordsRequired'}
              stroke={`var(--${CssColorsVarsConstant.GraphLineTarget})`}
              name={'Дневная цель'}
              dot={{ r: 6, fill: `var(--${CssColorsVarsConstant.ActiveDot})` }}
            />

            {/* Trend line for better comparison */}
            <Line
              type={'monotone'}
              dataKey={'trendComparedToTarget'}
              stroke={`var(--${CssColorsVarsConstant.GraphLineTrend})`}
              name={'Тренд'}
              strokeDasharray={'5 5'}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  });
