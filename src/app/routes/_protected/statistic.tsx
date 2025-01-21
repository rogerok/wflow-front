import { createFileRoute } from '@tanstack/react-router'
import { StatisticPage } from '@pages'

export const Route = createFileRoute('/_protected/statistic')({
  component: StatisticPage,
})
