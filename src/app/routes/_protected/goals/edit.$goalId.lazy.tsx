import { createLazyFileRoute } from '@tanstack/react-router';
import { GoalEditPage } from '@pages/GoalEditPage';

export const Route = createLazyFileRoute('/_protected/goals/edit/$goalId')({
  component: GoalEditPage,
});
