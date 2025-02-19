import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import {
  ButtonLink,
  Card,
  CardContent,
  HStack,
  Page,
  PageTitle,
} from '@shared/elements/ui';
import { CardHeader } from '@shared/elements/ui/Card/CardHeader/CardHeader';
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

      <HStack as={'ul'} gap={'16'} fullWidth>
        {service.data.map((book) => (
          <Card>
            <CardContent key={book.id}>
              <CardHeader title={book.name} subtitle={book.description} />
              <p>Создано {new Date(book.createdAt).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </HStack>
    </Page>
  );
});
