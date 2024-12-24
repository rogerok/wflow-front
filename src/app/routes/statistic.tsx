import { createFileRoute } from '@tanstack/react-router';
import { StatisticPage } from '@pages';

export const Route = createFileRoute('/statistic')({
  component: StatisticPage,
});
