import { createLazyFileRoute } from '@tanstack/react-router'
import { BooksPage } from '@pages/BooksPage'

export const Route = createLazyFileRoute('/_protected/books/')({
  component: BooksPage,
})
