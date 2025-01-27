import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnGoalsPage = cn('GoalsPage');

interface GoalsPageProps {
  className?: string;
}

export const GoalsPage: FC<GoalsPageProps> = (props) => {
  return (
    <div className={cnGoalsPage(undefined, [props.className])}>
      GoalsPage
    </div>
  );
};