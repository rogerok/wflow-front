import { cn } from '@bem-react/classname';
import { routes } from '@shared/const';
import {
  ButtonLink,
  Card,
  CardContent,
  CardHeader,
  HStack,
  Page,
  PageTitle,
  Typography,
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

      <HStack as={'ul'} gap={'16'} fullWidth>
        {service.data.map((book) => (
          <Card key={book.id} as={'li'}>
            <CardHeader title={book.name} />
            <CardContent>
              <Typography>{book.description}</Typography>
              <p>Создано {new Date(book.createdAt).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </HStack>
    </Page>
  );
});
