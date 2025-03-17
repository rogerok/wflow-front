import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import {
  ButtonLink,
  NotFoundLabel,
  Page,
  PageSeo,
  Pagination,
} from '@shared/elements/ui';
import { BooksService } from '@shared/services';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { BooksList } from './BooksList/BooksList';

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
      <PageSeo title={'Мои книги'} />
      <ButtonLink to={routes.booksCreate()}>Добавить книгу</ButtonLink>
      {service.data.length ? (
        <BooksList data={service.data} isLoading={service.isLoading} />
      ) : (
        <NotFoundLabel />
      )}
      <Pagination service={service.request} />
    </Page>
  );
});
