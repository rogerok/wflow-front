import { cn } from '@bem-react/classname';
import { routes, UiTextConstant } from '@shared/const';
import {
  ButtonLink,
  HStack,
  Page,
  PageSeo,
  Pagination,
} from '@shared/elements/ui';
import { BooksService } from '@shared/services';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

import { BooksContext } from '../model/context/BooksContext';
import { BooksList } from './BooksList/BooksList';
import { BooksSortMenu } from './BooksSortMenu/BooksSortMenu';

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

        <HStack flexJustify={'between'} align={'center'}>
          <ButtonLink to={routes.booksCreate()}>
            {UiTextConstant.add('книгу')}
          </ButtonLink>
          <BooksSortMenu />
        </HStack>
        <BooksList data={service.data} isLoading={service.isLoading} />
        <Pagination service={service.request} />
      </Page>
    </BooksContext>
  );
});
