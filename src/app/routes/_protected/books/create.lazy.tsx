import { createLazyFileRoute } from '@tanstack/react-router'
import { BooksCreatePage } from '@pages/BooksCreatePage'

export const Route = createLazyFileRoute('/_protected/books/create')({
  component: BooksCreatePage,
})
