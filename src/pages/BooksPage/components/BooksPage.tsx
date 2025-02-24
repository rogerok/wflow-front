import './BooksPage.scss';

import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import {
  Button,
  ButtonLink,
  Card,
  CardHeader,
  Page,
  PageTitle,
  VStack,
} from '@shared/elements/ui';
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
      <PageTitle title={'Мои книги'} />
      <ButtonLink to={routes.booksCreate()}>Добавить книгу</ButtonLink>

      <ul className={cnBooksPage('List')}>
        {service.data.concat(service.data).map((book) => (
          <Card className={cnBooksPage('ListItem')} key={book.id} as={'li'}>
            <VStack gap={'16'} mt={'auto'} fullHeight>
              <CardHeader title={book.name} />
              <VStack mt={'auto'} gap={'16'}>
                <ButtonLink
                  fullWidth
                  to={routes.bookDetails()}
                  params={{ bookId: book.id }}
                >
                  К книге
                </ButtonLink>
                <Button fullWidth>Добавить отчёт</Button>
                <Button fullWidth variant={'outlined'}>
                  Редактировать
                </Button>
              </VStack>
            </VStack>
          </Card>
        ))}
      </ul>
    </Page>
  );
});
