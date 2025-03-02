import { createFileRoute } from '@tanstack/react-router';
import { BooksPage } from '@pages/BooksPage';

export const Route = createFileRoute('/_protected/books')({
  component: BooksPage,
});
