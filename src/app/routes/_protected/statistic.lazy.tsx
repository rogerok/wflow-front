import { createLazyFileRoute } from '@tanstack/react-router'
import { StatisticPage } from '@pages/StatisticPage'

export const Route = createLazyFileRoute('/_protected/statistic')({
  component: StatisticPage,
})
