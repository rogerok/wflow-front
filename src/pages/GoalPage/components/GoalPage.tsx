import { cn } from '@bem-react/classname';
import { Page } from '@shared/elements/ui';
import { FC } from 'react';

const cnGoalPage = cn('GoalPage');

interface GoalPageProps {
  className?: string;
}

export const GoalPage: FC<GoalPageProps> = (props) => {
  return (
    <Page className={cnGoalPage(undefined, [props.className])}>GoalPage</Page>
  );
};
