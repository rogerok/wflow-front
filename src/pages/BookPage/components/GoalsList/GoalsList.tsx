import { cn } from '@bem-react/classname';
import { FC } from 'react';

const cnGoalsList = cn('GoalsList');

interface GoalsListProps {
  className?: string;
}

export const GoalsList: FC<GoalsListProps> = (props) => {
  return (
    <div className={cnGoalsList(undefined, [props.className])}>GoalsList</div>
  );
};
