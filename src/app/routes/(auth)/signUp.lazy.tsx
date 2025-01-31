import { createLazyFileRoute } from '@tanstack/react-router'
import { SignUpPage } from '@pages/SignUpPage'

export const Route = createLazyFileRoute('/(auth)/signUp')({
  component: SignUpPage,
})
