import { lazy, useEffect, useRef } from 'react';
import type {
  Area as AreaType,
  Bar as BarType,
  Brush as BrushType,
  RadialBar as RadialBarType,
} from 'recharts';

export const ResponsiveContainerLazy = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.ResponsiveContainer })),
);

export const RadialBarChartLazy = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.RadialBarChart })),
);

export const LineChartLazy = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.LineChart })),
);
export const CartesianGridLazy = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.CartesianGrid })),
);

export const XAxisLazy = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.XAxis })),
);
export const YAxisLazy = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.YAxis })),
);
export const TooltipLazy = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.Tooltip })),
);
export const LegendLazy = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.Legend })),
);
export const LineLazy = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.Line })),
);
export const ComposedChartLazy = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.ComposedChart })),
);

export const ScatterLazy = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.Scatter })),
);

export const useRechartsBrush = (): typeof BrushType | null => {
  const Brush = useRef<typeof BrushType | null>(null);

  useEffect(() => {
    import('recharts').then((mod) => {
      Brush.current = mod.Brush;
    });
  }, []);

  return Brush.current;
};

export const useRechartsArea = (): typeof AreaType | null => {
  const Area = useRef<typeof AreaType | null>(null);

  useEffect(() => {
    import('recharts').then((mod) => {
      Area.current = mod.Area;
    });
  }, []);

  return Area.current;
};

export const useRechartsBar = (): typeof BarType | null => {
  const Bar = useRef<typeof BarType | null>(null);

  useEffect(() => {
    import('recharts').then((mod) => {
      Bar.current = mod.Bar;
    });
  }, []);

  return Bar.current;
};
export const useRechartsRadialBar = (): typeof RadialBarType | null => {
  const RadialBar = useRef<typeof RadialBarType | null>(null);

  useEffect(() => {
    import('recharts').then((mod) => {
      RadialBar.current = mod.RadialBar;
    });
  }, []);

  return RadialBar.current;
};
