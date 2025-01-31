import { createFileRoute } from '@tanstack/react-router';
import { BooksCreatePage } from '@pages/BooksCreatePage';

export const Route = createFileRoute('/_protected/books/create')({
  component: BooksCreatePage,
});
