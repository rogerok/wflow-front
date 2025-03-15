import { cn } from '@bem-react/classname';
import { ComponentProps, FC } from 'react';
import {
  Legend,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';

import { CssVarsMapType } from '../../../types/theme';

const cnRadialStatistic = cn('RadialStatistic');

interface RadialStatisticProps {
  fill: CssVarsMapType;
  value: number;
  className?: string;
  domain?: ComponentProps<typeof PolarAngleAxis>['domain'];
}

export const RadialStatistic: FC<RadialStatisticProps> = (props) => {
  const { fill, className, value, domain = [0, 100] } = props;

  return (
    <ResponsiveContainer
      height={200}
      className={cnRadialStatistic(undefined, [className])}
    >
      <RadialBarChart
        innerRadius={'80%'}
        outerRadius={'100%'}
        data={[{ value: Math.round(value), fill: `var(--${fill})` }]}
        startAngle={90}
        endAngle={-270}
      >
        <Legend align={'center'} verticalAlign={'top'} iconSize={0} />

        <PolarAngleAxis tick={false} domain={domain} type="number" />
        <RadialBar
          label={{
            fill: `var(--${fill})`,
            position: 'center',
            fontSize: 'var(--font-size-l)',
            fontWeight: '500',
          }}
          dataKey="value"
          background
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
