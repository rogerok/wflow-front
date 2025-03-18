import { cn } from '@bem-react/classname';
import { CumulativeProgressType } from '@shared/api';
import { CssColorsVarsConstant } from '@shared/const';
import { Paper, Typography, VStack } from '@shared/elements/ui';
import { formatDate } from '@shared/lib';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useStatisticsService } from '../model/hooks/useStatisticsService';

const cnStatisticCumulativeProgress = cn('StatisticCumulativeProgress');

interface StatisticCumulativeProgressProps {
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: CumulativeProgressType;
  }[];
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Paper elevation={3} rounded={3} px={'16'} py={'16'}>
        <VStack gap={'4'}>
          <Typography size={'sm'}>Дата: {data.date}</Typography>
          <Typography size={'sm'}>
            Выполнено: {Math.round(data.completionPercent)}%
          </Typography>
          <Typography size={'sm'}>Книга: {data.bookName}</Typography>
          <Typography size={'sm'}>Цель: {data.goalTitle}</Typography>
        </VStack>
      </Paper>
    );
  }
  return null;
};

export const StatisticCumulativeProgress: FC<StatisticCumulativeProgressProps> =
  observer((props) => {
    const service = useStatisticsService();

    return (
      <div
        className={cnStatisticCumulativeProgress(undefined, [props.className])}
      >
        <ResponsiveContainer width={'100%'} height={500} style={{}}>
          <LineChart
            data={service.cumulativeProgress.map((point) => ({
              ...point,
              date: formatDate(point.date),
            }))}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={`var(--${CssColorsVarsConstant.GraphGrid})`}
            />
            <Brush
              dataKey={'date'}
              height={30}
              stroke={`var(--${CssColorsVarsConstant.GraphBrush})`}
            />
            <XAxis
              fontSize={'1rem'}
              dataKey={'date'}
              stroke={`var(--${CssColorsVarsConstant.AxisLine})`}
            />

            <YAxis
              fontSize={'1rem'}
              dataKey={'targetTotalWords'}
              stroke={`var(--${CssColorsVarsConstant.AxisLine})`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign={'top'} align={'center'} />
            <Line
              type="monotone"
              dataKey="totalWords"
              stroke={`var(--${CssColorsVarsConstant.GraphLinePrimary})`}
              activeDot={{
                r: 8,
                fill: `var(--${CssColorsVarsConstant.ActiveDot})`,
              }}
              name="Слов написано"
            />
            <Line
              type="monotone"
              dataKey="targetTotalWords"
              stroke={`var(--${CssColorsVarsConstant.GraphLineSecondary})`}
              strokeDasharray="5 5"
              name="Цель"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  });
