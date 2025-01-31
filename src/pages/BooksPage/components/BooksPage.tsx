import { cn } from '@bem-react/classname';
import { ButtonLink, Page, routes } from '@shared';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { BooksService } from '../../../shared/services/books/booksService';

const cnBooksPage = cn('BooksPage');

interface BooksPageProps {
  className?: string;
}

export const BooksPage: FC<BooksPageProps> = observer((props) => {
  const [service] = useState(() => new BooksService());

  useEffect(() => {
    service.list();
  }, [service]);

  return service.requestStore.isLoading ? (
    <p> loading </p>
  ) : (
    <Page className={cnBooksPage(undefined, [props.className])}>
      <ButtonLink to={routes.booksCreate()}>
        Добавить книгу бант линк
      </ButtonLink>
      {service.data.map((book) => (
        <p key={book.id}>{book.name}</p>
      ))}
    </Page>
  );
});
