import { createFileRoute } from '@tanstack/react-router';
import { GoalsPage } from '@pages';

export const Route = createFileRoute('/_protected/goals')({
  component: GoalsPage,
});
