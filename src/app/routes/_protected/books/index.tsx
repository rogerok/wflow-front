import { createFileRoute } from '@tanstack/react-router'
import { BooksPage } from '@pages'

export const Route = createFileRoute('/_protected/books/')({
  component: BooksPage,
})
