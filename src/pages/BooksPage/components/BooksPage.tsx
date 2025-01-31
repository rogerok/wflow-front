import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import { ButtonLink, Page } from '@shared/elements';
import { BooksService } from '@shared/services';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

const cnBooksPage = cn('BooksPage');

interface BooksPageProps {
  className?: string;
}

export const BooksPage: FC<BooksPageProps> = observer((props) => {
  const [service] = useState(() => new BooksService());

  useEffect(() => {
    service.list();

    return () => {
      service.abortRequest();
    };
  }, [service]);

  return (
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
