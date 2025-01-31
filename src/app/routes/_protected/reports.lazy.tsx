import { createLazyFileRoute } from '@tanstack/react-router'
import { ReportsPage } from '@pages/ReportsPage'

export const Route = createLazyFileRoute('/_protected/reports')({
  component: ReportsPage,
})
