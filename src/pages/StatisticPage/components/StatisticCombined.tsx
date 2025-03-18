import { cn } from '@bem-react/classname';
import { CssColorsVarsConstant } from '@shared/const';
import { Paper, Typography, VStack } from '@shared/elements/ui';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import {
  Area,
  Bar,
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useStatisticsService } from '../model/hooks/useStatisticsService';
import { StatisticsCombinedChartType } from '../model/types/statisticsType';

const cnStatisticCombined = cn('StatisticCombined');

interface StatisticCombinedProps {
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: StatisticsCombinedChartType;
  }[];
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Paper elevation={3} rounded={3} px={'16'} py={'16'}>
        <VStack gap={'4'}>
          <Typography size={'sm'}>Книга: {data.bookName}</Typography>
          <Typography size={'sm'}>Всего слов: {data.totalWords}</Typography>
          <Typography size={'sm'}>Название цели: {data.goalTitle}</Typography>
          <Typography size={'sm'}>
            Среднее кол-во слов в день: {data.avgWordsPerDay}
          </Typography>
          <Typography size={'sm'}>
            Необходимое кол-во слов в день: {data.dailyRequired}
          </Typography>
          <Typography size={'sm'}>
            Выполнено: {Math.round(data.completionPercent)}%
          </Typography>
        </VStack>
      </Paper>
    );
  }
  return null;
};

export const StatisticCombined: FC<StatisticCombinedProps> = observer(
  (props) => {
    const service = useStatisticsService();

    return (
      <ResponsiveContainer
        className={cnStatisticCombined(undefined, [props.className])}
        width={'100%'}
        height={500}
      >
        <ComposedChart data={service.combinedData}>
          <CartesianGrid
            stroke={`var(--${CssColorsVarsConstant.GraphGrid})`}
            strokeDasharray="3 3"
          />
          <XAxis
            fontSize={'1rem'}
            dataKey={'date'}
            stroke={`var(--${CssColorsVarsConstant.AxisLine})`}
          />
          <Brush
            dataKey={'date'}
            height={30}
            stroke={`var(--${CssColorsVarsConstant.GraphBrush})`}
          />
          <YAxis
            fontSize={'1rem'}
            yAxisId={'left'}
            stroke={`var(--${CssColorsVarsConstant.AxisLine})`}
          />
          <YAxis
            fontSize={'1rem'}
            yAxisId={'right'}
            orientation={'right'}
            stroke={`var(--${CssColorsVarsConstant.AxisLine})`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign={'top'} align={'center'} />
          <Area
            yAxisId={'left'}
            type={'monotone'}
            dataKey={'completionPercent'}
            fill={`var(--${CssColorsVarsConstant.GraphLinePrimary})`}
            stroke={`var(--${CssColorsVarsConstant.GraphLinePrimary})`}
            name={'Выполнено %'}
          />
          <Line
            yAxisId={'left'}
            type={'monotone'}
            dataKey={'totalWords'}
            stroke={`var(--${CssColorsVarsConstant.GraphLineSecondary})`}
            name={'Написано'}
            dot={{ r: 6, fill: `var(--${CssColorsVarsConstant.LineDot})` }}
          />
          <Line
            yAxisId={'left'}
            type={'monotone'}
            dataKey={'targetWords'}
            stroke={`var(--${CssColorsVarsConstant.GraphLineTarget})`}
            strokeDasharray={'5 5'}
            name={'Цель'}
          />
          <Bar
            yAxisId={'right'}
            dataKey={'avgWordsPerDay'}
            barSize={20}
            fill={`var(--${CssColorsVarsConstant.GraphBarColor})`}
            name={'Среднее кол-во слов в день'}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  },
);
