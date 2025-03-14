import { createLazyFileRoute } from '@tanstack/react-router';
import { GoalPage } from '@pages/GoalPage';

export const Route = createLazyFileRoute('/_protected/goals/$goalId')({
  component: GoalPage,
});
