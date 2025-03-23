import { cn } from '@bem-react/classname';
import { FC } from 'react';

import { useRecharts } from '../../../lib';
import { CssVarsMapType } from '../../../types/theme';

const cnRadialStatistic = cn('RadialStatistic');

interface RadialStatisticProps {
  fill: CssVarsMapType;
  value: number;
  className?: string;
  domain?: string[] | number[];
}

export const RadialStatistic: FC<RadialStatisticProps> = (props) => {
  const { fill, className, value, domain = [0, 100] } = props;

  const Recharts = useRecharts();

  const {
    ResponsiveContainer,
    RadialBarChart,
    Legend,
    PolarAngleAxis,
    RadialBar,
  } = Recharts;

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
