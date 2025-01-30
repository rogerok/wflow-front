import { cn } from '@bem-react/classname';
import { ButtonLink, getBooks, Page, routes } from '@shared';
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
      <ButtonLink to={routes.booksCreate()}>
        Добавить книгу бант линк
      </ButtonLink>
    </Page>
  );
};
