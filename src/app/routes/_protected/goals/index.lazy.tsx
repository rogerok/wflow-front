import { createLazyFileRoute } from '@tanstack/react-router'
import { GoalsPage } from '@pages/GoalsPage'

export const Route = createLazyFileRoute('/_protected/goals/')({
  component: GoalsPage,
})
