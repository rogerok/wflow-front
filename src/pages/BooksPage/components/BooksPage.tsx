import { cn } from '@bem-react/classname';
import { routes, UiTextConstant } from '@shared/const';
import { ButtonLink, Page, PageSeo, Pagination } from '@shared/elements/ui';
import { BooksService } from '@shared/services';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { BooksList } from '../components/BooksList/BooksList';
import { BooksContext } from '../model/context/BooksContext';

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
    <BooksContext value={service}>
      <Page className={cnBooksPage(undefined, [props.className])}>
        <PageSeo title={'Мои книги'} />
        <ButtonLink to={routes.booksCreate()}>
          {UiTextConstant.add('Книгу')}
        </ButtonLink>
        <BooksList data={service.data} isLoading={service.isLoading} />
        <Pagination service={service.request} />
      </Page>
    </BooksContext>
  );
});
