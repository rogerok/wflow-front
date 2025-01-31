import { createFileRoute } from '@tanstack/react-router';
import { StatisticPage } from '@pages/StatisticPage';

export const Route = createFileRoute('/_protected/statistic')({
  component: StatisticPage,
});
