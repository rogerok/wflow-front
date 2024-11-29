import { createFileRoute } from '@tanstack/react-router';
import { StatisticPage } from '@wflow-front/pages';

export const Route = createFileRoute('/statistic')({
  component: StatisticPage,
});
