import { createFileRoute } from '@tanstack/react-router'
import { BooksCreatePage } from '@pages'

export const Route = createFileRoute('/_protected/books/create')({
  component: BooksCreatePage,
})
