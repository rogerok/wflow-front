import { createLazyFileRoute } from '@tanstack/react-router';
import { GoalsCreatePage } from '@pages/GoalsCreatePage';

export const Route = createLazyFileRoute('/_protected/goals/create')({
  component: GoalsCreatePage,
});
