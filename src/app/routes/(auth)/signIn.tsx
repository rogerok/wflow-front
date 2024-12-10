import { createFileRoute } from '@tanstack/react-router'
import { SignInPage } from '@wflow-front/pages'

export const Route = createFileRoute('/(auth)/signIn')({
  component: SignInPage,
})
