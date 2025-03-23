import { createLazyFileRoute } from '@tanstack/react-router';
import { BookEditPage } from '@pages/BookEditPage';

export const Route = createLazyFileRoute('/_protected/books/edit/$bookId')({
  component: BookEditPage,
});
