import { createFileRoute } from '@tanstack/react-router'
import { SignUpPage } from '@wflow-front/pages'

export const Route = createFileRoute('/(auth)/signUp')({
  component: SignUpPage,
})
