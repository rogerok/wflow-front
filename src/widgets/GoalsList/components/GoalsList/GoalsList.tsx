import './GoalsList.scss';

import { cn } from '@bem-react/classname';
import { GoalsListResponseType } from '@shared/types';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { GoalsListItem } from '../GoalsListItem/GoalsListItem';

const cnGoalsList = cn('GoalsList');

interface GoalsListProps {
  data: GoalsListResponseType;
  className?: string;
}

export const GoalsList: FC<GoalsListProps> = observer((props) => {
  const { className, data } = props;

  return (
    <ul
      className={cnGoalsList(undefined, [className])}
      // as={'ul'}
      // fullWidth
      // gap={'24'}
    >
      {data.map((item) => (
        <GoalsListItem data={item} key={item.id} />
      ))}
    </ul>
  );
});
