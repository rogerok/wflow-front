import { cn } from '@bem-react/classname';
import { AppLink, Button, ButtonLink, getBooks, Page, routes } from '@shared';
import { Link } from '@tanstack/react-router';
import { FC, useEffect } from 'react';

const cnBooksPage = cn('BooksPage');

interface BooksPageProps {
  className?: string;
}

export const BooksPage: FC<BooksPageProps> = (props) => {
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <Page className={cnBooksPage(undefined, [props.className])}>
      <Button>
        <AppLink to={routes.booksCreate()}>Добавить книгу</AppLink>
      </Button>
      <ButtonLink>sdsds</ButtonLink>
    </Page>
  );
};
