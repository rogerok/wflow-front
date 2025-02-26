import './GoalsList.scss';

import { cn } from '@bem-react/classname';
import { GoalResponseType, GoalsListResponseType } from '@shared/api';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

import { GoalsListItem } from '../GoalsListItem/GoalsListItem';

const cnGoalsList = cn('GoalsList');

interface GoalsListProps {
  data: GoalsListResponseType;
  className?: string;
  actions?: (goalId: GoalResponseType) => ReactNode;
}

export const GoalsList: FC<GoalsListProps> = observer((props) => {
  const { className, data, actions } = props;

  return (
    <ul className={cnGoalsList(undefined, [className])}>
      {data.map((item) => (
        <GoalsListItem
          data={item}
          key={item.id}
          actions={actions ? actions(item) : null}
        />
      ))}
    </ul>
  );
});
