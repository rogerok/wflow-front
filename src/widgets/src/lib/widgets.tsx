import { cn } from '@bem-react/classname';
import { Features } from '@wflow-front/features';
import { Shared } from '@wflow-front/shared';
import { FC } from 'react';

const cnWidgets = cn('Widgets');

interface WidgetsProps {
  className?: string;
}

export const Widgets: FC<WidgetsProps> = (props) => {
  return (
    <div className={cnWidgets(undefined, [props.className])}>
      <Features />
      <Shared />
    </div>
  );
};
