import { cn } from '@bem-react/classname';
import { AppLink, Button, getBooks, Page, routes } from '@shared';
import { FC, useEffect } from 'react';
import { ButtonLink } from '../../../shared/elements/ui/AppLink/AppLink';

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
      <ButtonLink to={'/books'}>sdsds</ButtonLink>
    </Page>
  );
};
